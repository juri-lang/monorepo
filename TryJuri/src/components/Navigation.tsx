import { Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemText,Link } from '@mui/material';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { ReactNode, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { AppRoutes } from '../routes/Routing';
const drawerWidth = '244';




const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'

  }));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `${drawerWidth}px`,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Navigation({ children }: { children?: ReactNode }) {
    let [open, setOpen] = useState(false);

    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <>
        <AppBar position='fixed' >
            <Toolbar sx={{color: 'white', opacity:0.5, backdropFilter: 'blur(10px)', ...(open && { marginLeft: `${drawerWidth}px` }) }}>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, ...(open && { display: 'none' }) }} onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' fontWeight='bold' color='inherit'><Link href='/' color='inherit' underline='none'>juri-lang</Link></Typography>

            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: `${drawerWidth}px`,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{color:'inherit'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {AppRoutes.paths.map((text, index) => (
            <ListItem button component='a' href={text} key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
        <DrawerHeader/>
        <Main id='main' open={open}>
            {children}
        </Main>
    </>
}




