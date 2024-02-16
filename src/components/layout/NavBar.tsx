import {Avatar, Box, Button, Container, DropdownMenu, Flex, Text} from '@radix-ui/themes'
import classNames from 'classnames'
import { useAuthContext } from "@asgardeo/auth-react";
import { AiFillBug } from 'react-icons/ai'
import {Skeleton} from "../common";
import {Link, useLocation} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link to='/'><AiFillBug /></Link>
                        <NavLinks />
                        {/*<IssueLatestBadge />*/}
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const location = useLocation();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map((link) =>
                <li key={link.href}>
                    <Link
                        className={classNames({
                            'nav-link': true,
                            '!text-zinc-900': location.pathname === link.href
                        })}
                        to={link.href}>
                        {link.label}
                    </Link>
                </li>)}
        </ul>
    )
}

const AuthStatus = () => {
    const { state, signIn, signOut, isAuthenticated } = useAuthContext();

    if (state.isLoading) return <Skeleton width='3rem' />;

    if (!isAuthenticated()) return <Button onClick={() => signIn()} className='nav-link'>Log In</Button>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src='/vite.svg'
                        fallback='?'
                        size='2'
                        radius='full'
                        className='cursor-pointer'
                        referrerPolicy='no-referrer'
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>
                            {state.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Button onClick={() => signOut()}>Log out</Button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar
