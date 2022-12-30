import { ArrowLeftIcon, SettingsIcon, ArrowRightIcon, ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons"
import { FormControl, FormLabel, Input, IconButton, Stack, Image as ChakraImage, Button, Flex } from '@chakra-ui/react'
import { Suggestlist } from 'components/List/SuggestionList'
import { useState, useMemo, memo, Fragment, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router'
import Slider from "react-slick"
import "./css/Slider.css"
import { API } from "api"
import { GenerateCertificate } from "generator"
import { configuration } from "api"
import { Loading } from "components/Loading"


function GeneratePage() {
  const { type } = useParams()
  const navigate = useNavigate()

  const [preloaded, setPreloaded] = useState({
    images: { en: null, ua: null },
    dataset: null
  });
  const [isLoaded, setIsLoaded] = useState({
    isImageLoad: { en: false, ua: false },
    isDatasetLoaded: false
  })
  const [isGenerationStart, setIsGenerationStart] = useState(false)
  // const [isGenerationInProggres, setGenerationProgress] = useState(true)
  const [suggestion, setSuggestion] = useState([])
  const [images, setImages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const en = new Image();
    const ua = new Image();

    en.src = API.offline.FetchIMG(type)[0];
    ua.src = API.offline.FetchIMG(type)[1];

    en.addEventListener('load', () => {
      setIsLoaded(p => ({ ...p, isImageLoad: { ...p.isImageLoad, en: true } }));
      setPreloaded(p => ({ ...p, images: { ...p.images, en: en } }))
    })

    ua.addEventListener('load', () => {
      setIsLoaded(p => ({ ...p, isImageLoad: { ...p.isImageLoad, ua: true } }));
      setPreloaded(p => ({ ...p, images: { ...p.images, ua: ua } }))
    })

  }, [type])

  useEffect(() => {
    if (preloaded.dataset === null) {
      setPreloaded(p => ({ ...p, dataset: API.offline.FetchData(type) }))
    }

    setIsLoaded(p => ({ ...p, isDatasetLoaded: true }))
  }, [preloaded.dataset, type])

  const onChange = useCallback((event) => {
    setSuggestion([]);

    if (event.target.value) {
      setSuggestion(preloaded.dataset.filter(({ nameUA }) => nameUA.toLowerCase().startsWith(event.target.value.toLowerCase())));
    }

    setInput(event.target.value);
  }, [preloaded.dataset])

  const onSuggest = useCallback((value) => {
    setSuggestion([]);
    setInput(value);
  }, [])

  const onGenerateHandler = useCallback(() => {
    const dataset = preloaded.dataset.find(({ nameUA }) => nameUA === input)

    GenerateCertificate({
      settings: configuration[type],
      dataset: dataset,
      type: type,
      img: [preloaded.images.ua, preloaded.images.en]
    })
      .then((res) => {
        setImages(res);
        setIsGenerationStart(false)
      })
      .catch((reason) => {
        setImages([]);
        console.trace(reason.stack)
      })
  }, [type, preloaded.images.ua, preloaded.images.en, input, preloaded.dataset])

  const onGenerateClick = useCallback(() => {
    setIsGenerationStart(true);
    setImages([]);
    onGenerateHandler()
  }, [onGenerateHandler])

  if (!isLoaded.isDatasetLoaded || !isLoaded.isImageLoad.ua || !isLoaded.isImageLoad.en) {
    return <Loading />
  }

  return (
    <>
      <Flex direction='column' mx={{ md: '13rem', }} pb="1.2rem">
        <Stack rounded={5} p={2} mt={4} display='flex' justifyContent='center' flexDirection='row' alignItems='end' gap={1}>
          <Button bg='white' variant='outline' leftIcon={<ArrowBackIcon />} px={6} onClick={() => navigate('/')}>Повернутися</Button>
          <FormControl p={0}>
            <FormLabel color="white">Введіть ім'я</FormLabel>
            <Input autoComplete="off" bg='white' type='text' value={input} onChange={onChange} />
            <Suggestlist list={suggestion} onSuggest={onSuggest} />
          </FormControl>
          <Button leftIcon={<SettingsIcon />} bg='white' variant='outline' icon={<SettingsIcon />} px={6} onClick={onGenerateClick}>Отримати</Button>
        </Stack>
      </Flex>
      {
        images.length > 0 && <Carusel type={type} images={[images[0].image, images[1].image, images[0].image, images[1].image]} />
      }
      {
        isGenerationStart && <Flex color="red.500"> ANIME </Flex>
      }
      
    </>
  )
}

function Carusel({ images, type }) {
  const [imageIndex, setImageIndex] = useState(0)

  const settings = useMemo(() => ({
    infinite: true,
    lazyLoad: true,
    speed: 600,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next)
  }), []);

  return (
    <Flex>
      <Slider {...settings} className={"w-100 h-100 " + (type === 'diploma' ? 'bigg' : 'def')} >
        {
          images.map((img, idx) => <MemoImage key={idx} type={type} index={idx} imageIndex={imageIndex} lang={idx % 2 === 0 ? "en" : 'ua'} img={img} />)
        }
      </Slider>
    </Flex>
  )
}

const MemoImage = memo(({ index, img, imageIndex, lang, type }) => {
  const cls = (index === imageIndex ? 'slide activeSlide' : 'slide') + (type === 'mentor' ? ' morsize' : '')
  return (
    <div className={cls}>
      <ImageOverlay isShown={index === imageIndex} img={img} lang={lang} />
      <ChakraImage src={img} alt={img} boxShadow="large" />
    </div>
  )
})

const ImageOverlay = memo(({ img, isShown, lang }) => {
  const Download = (img) => {
    const a = document.createElement('a');
    a.href = img;
    a.download = lang + '.jpg'
    a.click()
  }


  if (isShown) {
    return (
      <div style={{ display: 'flex', position: 'absolute', right: 0, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '.3rem' }} className="overlay">
        <IconButton w={5} icon={<DownloadIcon />} onClick={() => Download(img)} colorScheme="twitter"></IconButton>
      </div>
    )
  }

  return <Fragment />
})

const Arrow = ({ onClick, icon, className }) => <div className={'arrow ' + className}><IconButton variant='outline' colorScheme="twitter" icon={icon} onClick={onClick} /></div>

const NextArrow = ({ onClick }) => <Arrow onClick={onClick} icon={<ArrowLeftIcon />} className="prev" />
const PrevArrow = ({ onClick }) => <Arrow onClick={onClick} icon={<ArrowRightIcon />} className="next" />

export default GeneratePage