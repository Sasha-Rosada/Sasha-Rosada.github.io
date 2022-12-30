import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Stack,
  Image,
  Flex,
  ListItem,
  List,
  Box
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router'
import { useState, useMemo, memo, Fragment, useCallback } from 'react'
import { ArrowLeftIcon, SettingsIcon, ArrowRightIcon, ArrowBackIcon, DownloadIcon } from "@chakra-ui/icons"
import "./css/Slider.css"
import Slider from "react-slick";
import { Loading } from "./components/Loading"
import { useFetchAutocomplate } from './hooks';
import { API } from 'api'


function Generate() {
  const { type } = useParams()
  const navigate = useNavigate()
  }

  return (
    <>
      <Flex direction='column' mx={'30rem'} pb="1.2rem">
        <Stack rounded={5} p={2} mt={4} display='flex' justifyContent='center' flexDirection='row' alignItems='end' gap={1}>
          <IconButton bg='white' variant='outline' icon={<ArrowBackIcon />} onClick={() => navigate('/')} />
          <FormControl p={0}>
            <FormLabel color="white">Введіть ім'я</FormLabel>
            <Input bg='white' type='text' value={'username'} onChange={'onChange'} />
            <Suggestlist list={'suggestions'} onSuggest={'onSuggest'} />
          </FormControl>
          <IconButton bg='white' variant='outline' icon={<SettingsIcon />} onClick={'() => RequestImages(username)'} />
        </Stack>
      </Flex>
      {

      }
    </>
  )
}

function Suggestlist({ list, onSuggest }) {
  return list.length > 0 && (
    <Box boxShadow='lg' rounded='md' bg='white' position="absolute" maxHeight={300} zIndex={999} width="100%" overflowY="scroll">
      <List spacing={3} className="suggest-list">
        {
          list.map(({ nameUA }) => <ListItem key={nameUA} p='3' onClick={() => onSuggest(nameUA)}>{nameUA}</ListItem>)
        }
      </List>
    </Box>
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
    <Slider {...settings} className={"w-100 h-100 " + (type === 'diploma' ? 'bigg' : 'def')} >
      {
        images.map((img, idx) => <MemoImage key={idx} type={type} index={idx} imageIndex={imageIndex} lang={idx % 2 === 0 ? "en" : 'ua'} img={img} />)
      }
    </Slider>
  )
}

const MemoImage = memo(({ index, img, imageIndex, lang, type }) => {
  const cls = (index === imageIndex ? 'slide activeSlide' : 'slide') + (type === 'mentor' ? ' morsize' : '')
  return (
    <div className={cls}>
      <ImageOverlay isShown={index === imageIndex} img={img} lang={lang} />
      <Image src={img} alt={img} boxShadow="large" />
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

export default Generate
