import { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Rating, Stack, Typography } from '@pankod/refine-mui'
import propertiesData from '../data/properties.json';
import agentData from '../data/agents.json';
import { useLocation, useNavigate } from '@pankod/refine-react-router-v6';
import { CustomButton } from 'components';
import '../utils/map.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KingBedIcon from '@mui/icons-material/KingBed';
import MessageIcon from '@mui/icons-material/Message';
import CallIcon from '@mui/icons-material/Call';

const PropertyDetails = () => {
  const location = useLocation();
  const pid: number = parseInt(location.search.slice(4));
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ( pid > propertiesData.length ) {
      setData(propertiesData[0]);
      return;
    }

    propertiesData.forEach(e => {
      if ( e.id === pid ) {
        setData(e);
        return;
      };
    })
  }, [pid])

  const handleBackPage = () => {
    navigate('/property');
  }

  if ( data === null )
    return (<h1>Loading...</h1>)

  return (
    <Box>
      <Stack direction='row' alignItems='center' gap={2} mb={2}>
        <IconButton onClick={handleBackPage}><KeyboardArrowLeftIcon /></IconButton>
        <Typography fontSize={22} fontWeight={600}>Details</Typography>
      </Stack>  
      <Box display='flex' sx={{ flexDirection: {xs: 'column', lg: 'row'}, backgroundColor: '#fcfcfc', p: 1, borderRadius: '12px' }}>
        <Box flex={3} p={1} px={1}>
          <img style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', objectPosition: 'bottom', borderRadius: '1rem' }} src={`/assests/${data.image}`} alt={data.image} />
          <Box>
            <Stack flex={1} gap={1} mt={1}>
              <Box display='flex' alignItems='center' justifyContent='space-between' gap={3} sx={{ flexDirection: {xs: 'column', sm: 'row'}, alignItems: {xs: 'flex-start', sm: 'center'} }}>
                <Stack gap={1}>
                  <Typography fontSize={18} fontWeight={500} color='#11142D'>{data.type}</Typography>
                  <Typography fontSize={22} fontWeight={500} color='#11142D'>{data.title}</Typography>
                  <Stack direction='row' alignItems='center' gap={1} sx={{ 'svg': { color: '#808191', fontSize: '14px' } }}><LocationOnIcon /> <Typography textTransform='capitalize' fontSize={14} fontWeight={400} color='#808191'>{data.location}</Typography></Stack>
                </Stack>
                <Stack>
                  <Rating name="read-only" value={data.rate} size='large' readOnly />
                  <Typography fontSize={16} fontWeight={500} color='#11142D' mt={1}>Price</Typography>
                  <Typography display='flex' gap={1} alignItems='center' fontSize={25} fontWeight={700} color='#475BE8'>${data.price} <Typography color='#808191' fontSize={14} fontWeight={400}>{data.price_paid}</Typography></Typography>
                </Stack>
              </Box>
              <Typography fontSize={18} fontWeight={500} mt={2} color='#11142D'>Facillity</Typography>
              <Box display='flex' alignItems='center' flexWrap='wrap'  my={2} sx={{ rowGap: 2, columnGap: {xs: 3, md: 10} }}>
                {data.facillity.map((fac: any, ind: number) => (
                  <Stack key={ind} flex="flex" direction='row' alignItems='center' gap={.5} sx={{ 'svg': { color: '#808191', fontSize: '16px' } }}><KingBedIcon /> <Typography textTransform='capitalize' fontSize={14} fontWeight={500} color='#808191'>{fac?.count}{fac.count && " "}{fac.title}</Typography></Stack>
                  ))}
              </Box>
              <Typography fontSize={18} fontWeight={500} color='#11142D' mt={2}>Description</Typography>
              <Typography fontSize={14} fontWeight={400} color='#808191' mt={1}>{data.description}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box flex={1} mt='8px' gap={2} px={2} sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'column' } }}>
          <Stack gap={2} alignItems='center' px={1} py={3} mx='auto' sx={{ width: {xs: '100%', lg: 400 }, backgroundColor: '#fcfcfc', borderRadius: '12px', border: '1px solid' }}>
            <Avatar src={`/assests/${agentData[0].avatar}`} alt={agentData[0].name} sx={{ width: 80, height: 80 }} />
            <Typography fontSize={18} fontWeight={600} color='#11142D'>{agentData[0].name}</Typography>
            <Typography fontSize={14} fontWeight={400} color='#808191'>{agentData[0].type}</Typography>
            <Stack direction='row' alignItems='center' gap={1} sx={{ 'svg': { color: '#808191', fontSize: '14px' } }}><LocationOnIcon /> <Typography textTransform='capitalize' fontSize={14} fontWeight={400} color='#808191'>{agentData[0].address.state}, {agentData[0].address.country}</Typography></Stack>
            <Typography fontSize={16} fontWeight={600} color='#11142D'>{agentData[0].info.properties_count} Properties</Typography>
            <Stack direction='row' gap={3} width='100%' px={3}>
              <CustomButton
                title="Message"
                type='contained'
                backgroundColor='#475BE8'
                color='#FCFCFC'
                icon={<MessageIcon />}
                customeStyle={{ flex: 1 }}
              />
              <CustomButton 
                title="Call"
                type='contained'
                backgroundColor='#2ED480'
                color='#FCFCFC'
                icon={<CallIcon />}
                customeStyle={{ flex: 1 }}
              />
            </Stack>
          </Stack>
          <Stack gap={2} sx={{ backgroundColor: '#fcfcfc', borderRadius: '12px' }}>
            <div className="mapouter"><div className="gmap_canvas"><iframe className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=400px&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://www.gachacute.com/">Gacha Cute</a></div></div>
            <CustomButton 
                title="Book Now"
                type='contained'
                backgroundColor='#475BE8'
                color='#FCFCFC'
                fullWidth={true}
              />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertyDetails