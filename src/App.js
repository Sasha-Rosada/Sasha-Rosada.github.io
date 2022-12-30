import { Image as ImageCH } from '@chakra-ui/react'
import { API } from 'api';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  const url = [
    [
      API.offline.thubnail('participant'),
      () => navigate('/generate/type/participant'),
      "Учасникам"
    ],
    [
      API.offline.thubnail('diplomas'),
      () => navigate('/generate/type/diplomas'),
      "Переможцям"
    ],
    [
      API.offline.thubnail('mentor'),
      () => navigate('/generate/type/mentor'),
      "Викладачам"
    ]
  ]

  return (
    <>
      <div className='card-holder'>
        {
          url.map(([url, click, txt], idx) => {
            return (
              <div key={idx} className='card' onClick={click}>
                <div className='card-bg-overlay' />
                <div className='card-overlay'>
                  <div className='card-text'>{txt}</div>
                </div>
                <ImageCH src={url} borderRadius='lg' />
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default App;
