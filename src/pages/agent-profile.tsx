import { Avatar, Box, Stack, Typography } from '@pankod/refine-mui';
import { useLocation, useNavigate } from '@pankod/refine-react-router-v6';
import agentData from '../data/agents.json';
import propertiesData from '../data/properties.json';
import { motion } from 'framer-motion';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CheckIcon from '@mui/icons-material/Check';
import ReactApexChart from 'react-apexcharts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KingBedIcon from '@mui/icons-material/KingBed';

const AgentProfile = () => {
  const location = useLocation();
  const id = parseInt(location.search.slice(4));
  const data = agentData.find(a => a.id === id);

  return (
    <Box display='flex' flexDirection='column' gap={2} width='100%'>
      <Typography fontSize={25} fontWeight={700} color='#11142D'>Agent Details</Typography>
      <Box display='flex' alignItems='start' gap={2} width='100%' sx={{ flexDirection: {xs: 'column', lg: 'row'} }}>
        <PersonCard data={data}/>
        <AgentDetails data={data}/>
      </Box>
      <ActiveListing data={data}/>
    </Box>
  )
}

const PersonCard = ({data}) => (
  <Box sx={{ backgroundColor: '#fcfcfc', borderRadius: '8px', overflow: 'hidden', flex: 1, width: '100%' }}>
    <img style={{ height: '100px', width: '100%', objectFit: 'cover' }} src='/assests/house-5.jpg' alt='banar' />
    <Box display='flex' alignItems='center' gap={1} px={2}>
      <Avatar sx={{ width: 70, height: 70, mt: -3 }} src={`/assests/${data.avatar}`} alt={data.name} />
      <Stack>
        <Typography fontSize={16} fontWeight={600} color='#11142D'>{data.name}</Typography>
        <Typography fontSize={16} fontWeight={600} color='#808191'>{data.type}</Typography>
      </Stack>
    </Box>

    <Stack mt={2} gap={1} p={2}>
      <Box display='flex' alignItems='center'><Typography fontSize={14} fontWeight={400} color='#808191' flex={2}>Age:</Typography> <Typography fontSize={14} fontWeight={500} color='#11142D' flex={2}>{data.age}</Typography></Box>
      {Object.keys(data.address).map(ad => (
        <Box display='flex' alignItems='center'><Typography fontSize={14} fontWeight={400} color='#808191' flex={2}>{ad}:</Typography> <Typography fontSize={14} fontWeight={500} color='#11142D' flex={2}>{data.address[ad]}</Typography></Box>
        ))}
      <Box display='flex' alignItems='center'><Typography fontSize={14} fontWeight={400} color='#808191' flex={2}>Agent ID:</Typography> <Typography fontSize={14} fontWeight={500} color='#11142D' flex={2}>{data.agent_id}</Typography></Box>
      <Box display='flex' alignItems='center'><Typography fontSize={14} fontWeight={400} color='#808191' flex={2}>Phone:</Typography> <Typography fontSize={14} fontWeight={500} color='#11142D' flex={2}>{data.info.phone}</Typography></Box>
      <Box display='flex' alignItems='center'><Typography fontSize={14} fontWeight={400} color='#808191' flex={2}>Email:</Typography> <Typography fontSize={14} fontWeight={500} color='#11142D' flex={2}>{data.info.mail}</Typography></Box>
    </Stack>
    
    <Stack direction='row' sx={{ justifyContent: {xs: 'start', lg: 'center'} }} pb={2} px={2} gap={1}>
      {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />].map((e, ind) => (
        <Box sx={{ p: 1, borderRadius: '50%', backgroundColor: '#F7F7F7', color: ind === 0 ? '#1976D2' : ind === 1 ? 'red' : ind === 2 ? '#55ACEE' : '' }}>{e}</Box>
      ))}
    </Stack>
  </Box>
)

const AgentDetails = ({ data }) => (
  <Box flex={3} overflow='auto' sx={{ width: {xs: 'calc(100vw - 16px)', md: '100%', lg: 'auto'} }}>
    <Box sx={{ backgroundColor: '#fcfcfc', borderRadius: '8px', p: 2}} overflow='auto'>
      <Typography fontSize={18} fontWeight={600} color='#11142D'>Agent Details</Typography>
      <hr />
      <Typography fontSize={16} fontWeight={600} color='#808191'>{data.agent_details.description}</Typography>

      <Stack gap={1} my={3}>
        {Object.keys(data.agent_details).map((e, ind) => {
          if ( ind !== 0 ) 
          return (
            <Box display='flex' alignItems='center' gap={2}>
              <Box sx={{ width: 20, height: 20, backgroundColor: '#475BE8', borderRadius: '50%', color: '#fcfcfc', "svg": { fontSize: '16px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><CheckIcon /></Box>
              <Typography flex={1} fontSize={14} fontWeight={500} color='#11142D' textTransform='capitalize'>{e.replace('_', ' ')}</Typography>
              <Typography fontSize={14} fontWeight={500} color='#808191'>:</Typography>
              <Typography flex={2} fontSize={14} fontWeight={500} color='#808191'>{data.agent_details[e]}</Typography>
            </Box>
          )
        })}
        <hr />
        <Box>
          <Typography fontSize={18} fontWeight={600} color='#11142D'>Agent Status</Typography>
          <Stack direction='row' alignItems='center' gap={3} mt={2}>
            {Object.keys(data.agent_status).map((e, ind) => (
              <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={1} flex={1} sx={{ backgroundColor: '#fcfcfc', p: 1, borderRadius: '10px', border: '1px solid #E4E4E4' }}>
                <Typography flex={2} fontSize={16} fontWeight={400} color='#808191' textTransform='capitalize'>{e.replace('_', ' ')}</Typography>

                <Typography flex={1} fontSize={25} fontWeight={700} color='#11142D'>{data.agent_status[e]}</Typography>

                <ReactApexChart
                  options={{
                    chart: { type: 'donut' },
                    colors: [ind === 0 ? '#FE6D8E' : ind === 1 ? '#2ED480' : '#275be8', '#F2F6FC'],
                    legend: { show: false },
                    dataLabels: { enabled: false },
                  }}
                  series={[75, 25]}
                  type="donut"
                  width="120px"
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  </Box>
)

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const ActiveListing = ({ data }) => {
  const navigate = useNavigate();

  const handlePropertyClick = (ev: React.ChangeEvent<unknown>) => {
    const id = (ev.target as HTMLElement).getAttribute('id');
    navigate(`/property/show?id=${id}`)
  };
 return (
  <Box sx={{ backgroundColor: '#fcfcfc', borderRadius: '8px', p: 2}}>
    <Typography fontSize={18} fontWeight={600} color='#11142D' mt={1}>Active Listing</Typography>

    <motion.div variants={container} initial='hidden' animate='visible' style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem 0' }}>
      {data.active_listing.map(e => (
        <motion.div className='property-box' key={e} variants={item}>
          <img id={propertiesData[e].id.toString()} src={`/assests/${propertiesData[e].image}`} alt={propertiesData[e].image} onClick={handlePropertyClick} style={{ borderRadius: '12px', maxWidth: '220px', minWidth: '220px', height: '130px', objectFit: 'cover' }} />
          <Stack className='property-info' gap={1}>
            <Box sx={{ p: '.5rem', borderRadius: 1, color: '#475BE8', backgroundColor: '#DADEFA', width: 'fit-content', fontWeight: 600, fontSize: 12 }}>${propertiesData[e].price}</Box>
            <Typography id={propertiesData[e].id.toString()} fontWeight={600} fontSize={16} color='#11142D' sx={{ cursor: 'pointer' }} onClick={handlePropertyClick}>{propertiesData[e].title}</Typography>
            <Stack direction='row' alignItems='center' gap={1} sx={{ 'svg': { color: '#808191', fontSize: '14px' } }}><LocationOnIcon /> <Typography textTransform='capitalize' fontSize={14} fontWeight={400} color='#808191'>{propertiesData[e].location}</Typography></Stack>
            <Stack direction='row' alignItems='center' justifyContent='space-between' maxWidth='140px'>
              {propertiesData[e].facillity.slice(0, 2).map((fac, ind) => (
                <Stack key={ind} flex="flex" direction='row' alignItems='center' gap={.5} sx={{ 'svg': { color: '#808191', fontSize: '16px' } }}><KingBedIcon /> <Typography textTransform='capitalize' fontSize={12} fontWeight={400} color='#808191'>{fac?.count}{fac.count && " "}{fac.title}</Typography></Stack>
              ))}
            </Stack>
          </Stack>
        </motion.div>
      ))}
    </motion.div>
  </Box>
)}

export default AgentProfile