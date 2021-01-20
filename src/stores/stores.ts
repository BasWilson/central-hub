import { createContext } from 'react';
import { UserStore } from './user.store';
import { UIStore } from './ui.store';

export const stores = {
    userStore: createContext(new UserStore()),
    uiStore: createContext(new UIStore())
}