import { useState } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import Brightness6Icon from '@mui/icons-material/Brightness6'

import { useStore } from '../../utils/store'

interface Props {
  window?: () => Window
}

const drawerWidth = 240
const navItems = [
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com'
  },
  { icon: <GitHubIcon />, label: 'GitHub', link: 'https://github.com' }
]

export default function Navbar(props: Props) {
  const { window } = props

  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  const { theme, setTheme } = useStore()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        RavianAI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Button
                component='a'
                href={item.link}
                target='_blank'
                sx={{ color: 'inherit' }}>
                {item.icon}
                <ListItemText primary={item.label} />
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            RavianAI
          </Typography>
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ color: '#fff' }}
                component='a'
                href={item.link}
                target='_blank'>
                {item.icon}
              </Button>
            ))}
            <Button sx={{ color: '#fff' }}>
              <Brightness6Icon
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }}
              />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}>
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        {/* Add your main content here */}
      </Box>
    </Box>
  )
}
