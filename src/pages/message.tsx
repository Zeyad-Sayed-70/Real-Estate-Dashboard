import { Badge, Button, Divider, styled } from '@pankod/refine-mui'
import { Avatar, Box, GridSearchIcon, IconButton, InputBase, Paper, Stack, Typography } from '@pankod/refine-mui'

import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useEffect, useState } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Message = () => {
  const [support, setSupport] = useState<boolean>(true);
  const onResize = () => {
    if ( window.innerWidth <= 767 )
    setSupport(false);
    else
    setSupport(true);
  }
  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <Box>
      <Typography
        fontSize={'25px'}
        fontWeight={700}
        color='#11142D'
      >
        Messages
      </Typography>
      {!support && <Typography fontSize={16} fontWeight={600} mt={3} color='#11142D'>Error: Messages Page is Not Supported In Mobile Screens!</Typography> }
      <Box display={support ? 'flex' : 'none'} gap={1} mt={2}>
        <Box bgcolor='#fcfcfc' p={2} borderRadius={1} width={380} maxHeight='calc(100vh - 170px)' overflow='auto' sx={{ '&::-webkit-scrollbar': {background: 'none', width: 7}, '&::-webkit-scrollbar-thumb': {background: '#808191', borderRadius: 2} }}>
          <Paper
            component="form"
            sx={{ flex: 1, p: '4px 6px', display: 'flex', alignItems: 'center', backgroundColor: '#F7F7F7', height: 45, boxShadow: 'none' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <GridSearchIcon />
            </IconButton>
            <InputBase
              onChange={(e) => {}}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>
          <Stack gap={1} mt={2}>
            {[3,4,5,6,7,8,9,10,11,12,13].map((user, ind) => (
              <Box display='flex' p={1} borderRadius={1} gap={2}>
                <StyledBadge
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                <Avatar sx={{ width: 45, height: 45 }} src={`/assests/house-${user}.jpg`} alt='user-avatar' />
              </StyledBadge>
                <Stack>
                  <Typography fontSize={16} fontWeight={600} color='#11142D'>Jubed Ahmed</Typography>
                  <Typography fontSize={14} fontWeight={400} color='#808191'>I need a photo for see...</Typography>
                </Stack>
                <Typography flex={1} textAlign='end' fontSize={14} fontWeight={500} color='#808191'>3:25 AM</Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box display='flex' flexDirection='column' bgcolor='#fcfcfc' p={2} borderRadius={1} flex={1}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' gap={2}>
              <StyledBadge
                variant="dot"
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                >
                <Avatar sx={{ width: 45, height: 45 }} src={`/assests/house-${1}.jpg`} alt='user-avatar' />
              </StyledBadge>
              <Stack>
                <Typography fontSize={16} fontWeight={600} color='#11142D'>Jane Cooper</Typography>
                <Typography fontSize={14} fontWeight={400} color='#808191'>Active Now</Typography>
              </Stack>
            </Stack>

            <Stack direction='row' gap={1}>
              <IconButton><CallIcon /></IconButton>
              <IconButton><VideocamIcon /></IconButton>
              <IconButton><MoreVertIcon /></IconButton>
            </Stack>
          </Box>
          <hr />
          <Root><Divider variant='fullWidth'>Today</Divider></Root>
          
          <Stack>Messages...</Stack>

          <Stack mt='auto' direction='row' gap={1}>
            <Paper
              component="form"
              sx={{ flex: 1, p: '4px 6px', display: 'flex', alignItems: 'center', backgroundColor: '#E4E4E4', height: 45, boxShadow: 'none' }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <GridSearchIcon />
              </IconButton>
              <InputBase
                onChange={(e) => {}}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Message..."
                inputProps={{ 'aria-label': 'Message' }}
              />
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <TagFacesIcon />
              </IconButton>
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <InsertLinkIcon />
              </IconButton>
            </Paper>
            <Button sx={{ backgroundColor: '#E4E4E4', color: '#475BE8', '&:hover': { backgroundColor: '#475BE8', color: '#E4E4E4' } }}><SendOutlinedIcon /></Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Message