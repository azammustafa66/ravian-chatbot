import { create } from 'zustand'

import { Message } from '../types/types'

type Store = {
	message: Message | null
	messages: Message[]
	addMessage: (newMessage: Message) => void
	setMessages: (newMessages: Message[]) => void
	isTyping: boolean
	setIsTyping: (isTyping: boolean) => void
	theme: 'light' | 'dark'
	setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<Store>()((set, get) => ({
	message: null,
	messages: [],
	addMessage: (newMessage) => {
		set({ messages: [...get().messages, newMessage] })
	},
	setMessages: (newMessages) => {
		set({ messages: newMessages })
	},
	isTyping: false,
	setIsTyping: (isTyping) => set({ isTyping: isTyping }),
	theme: 'dark',
	setTheme: (theme) => set({ theme: theme })
}))
