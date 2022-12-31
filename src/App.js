import { Flex, Image as ImageCH } from '@chakra-ui/react'
import { API } from 'api';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react'


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
    <Flex flexDirection='column' alignItems='center'>
      <Text color='white' fontSize="5rem" fontWeight={800}  filter='blur(1px)'>
        Credico 2022
      </Text>
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
    </Flex>
  );
}

export default App;
