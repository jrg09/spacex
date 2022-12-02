import {useState,useEffect} from "react"
import * as API from "./modules/spacexapi"
import logo from './assets/SpaceX-Logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Badge, Card, Container, Modal, Stack} from 'react-bootstrap'
import { useRef } from "react"

export function App() {
  const [launches, setLaunches] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const refIframe = useRef(null);
  const [ifrmSrc,setIfrmSrc] = useState('');

  useEffect(() => {
    API.getAllLaunches().then((data) => setLaunches(data));
  }, []);

  const handleClickLaunch = (link) => {
    console.log(link);

    setIfrmSrc(link);

    setLgShow(true);

    return false;
  }

  return (
    <>      
      <Container fluid>
        <img src={logo} alt="logo"/>
        <h1>SpaceX Launches</h1>
        <p>
          Total lanches: <strong>{launches.length}</strong>.
        </p>
        
        <Stack gap={3}>
          {
            launches.map((launch) => (
              <Card key={launch.launch_date_unix+launch.mission_name} style={{ width: '18rem'}} className="m2">
                <Card.Header>
                  <Stack direction="horizontal">
                    <div className="me-auto fw-bold">{launch.mission_name}</div>
                    <div><a href="#" className="aLaunch" onClick={event => handleClickLaunch(launch.links.article_link)}>{launch.launch_year}</a></div>
                  </Stack>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="small">
                    {launch.details}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Stack direction="horizontal" gap={3}>
                    <div className="bg-light small me-auto">{launch.launch_date_local}</div>
                    <div className="bg-light">
                      <Badge bg={launch.launch_success ? 'success' : 'danger'}>{launch.launch_success ? 'Success' : 'Failed'}</Badge>
                    </div>

                  </Stack>
                </Card.Footer>
              </Card>
            ))
          }
        </Stack>
      </Container>
      <Modal size="lg" show={lgShow} onHide={()=>{setLgShow(false)}} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <iframe ref={refIframe} src={ifrmSrc} style={{width:'100%', height: '500px'}}></iframe>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>
  )
};

