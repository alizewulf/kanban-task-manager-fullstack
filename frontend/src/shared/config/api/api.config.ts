export interface ApiConfig {
	baseUrl: string
	auth: {
		login: string
	}
	users: {
		list: string
		create: string
	}
	columns: {
		list: (userId: number) => string
		create: (userId: number) => string
		update: (columnId: number) => string
		delete: (columnId: number) => string
	}
	categories: {
		list: (columnId: number) => string
		create: (columnId: number) => string
		update: (columnId: number, categoryId: number) => string
		delete: (columnId: number, categoryId: number) => string
	}
	tasks: {
		list: (categoryId: number) => string
        create: (categoryId: number) => string
	}
	subtasks: {
		list: (taskId: number) => string
	}
}

const API_BASE_URL = "http://localhost:3000"

export const api: ApiConfig = {
	baseUrl: API_BASE_URL,
	auth: {
		login: `${API_BASE_URL}/auth/login`,
	},
	users: {
		list: `${API_BASE_URL}/users`,
		create: `${API_BASE_URL}/users`,
	},
	columns: {
		list: (userId) => `${API_BASE_URL}/columns/${userId}`,
		create: (userId) => `${API_BASE_URL}/columns/${userId}`,
		update: (columnId) => `${API_BASE_URL}/columns/${columnId}`,
		delete: (columnId) => `${API_BASE_URL}/columns/${columnId}`,
	},
	categories: {
		list: (columnId) => `${API_BASE_URL}/columns/${columnId}/categories`,
		create: (columnId) => `${API_BASE_URL}/columns/${columnId}/categories`,
		update: (columnId, categoryId) =>
			`${API_BASE_URL}/columns/${columnId}/categories/${categoryId}`,
		delete: (columnId, categoryId) =>
			`${API_BASE_URL}/columns/${columnId}/categories/${categoryId}`,
	},
	tasks: {
		list: (categoryId) => `${API_BASE_URL}/categories/${categoryId}/tasks`,
        create: (categoryId) => `${API_BASE_URL}/categories/${categoryId}/tasks`
	},
	subtasks: {
		list: (taskId) => `${API_BASE_URL}/tasks/${taskId}/subtasks`,
	},
}
