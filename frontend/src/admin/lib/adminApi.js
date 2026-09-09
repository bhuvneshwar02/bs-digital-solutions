import { api } from '../../lib/api'

const opts = { auth: true }

// Content collections: /api/admin/<endpoint>
export const adminApi = {
  list: (endpoint) => api.get(`/admin/${endpoint}`, opts),
  get: (endpoint, id) => api.get(`/admin/${endpoint}/${id}`, opts),
  create: (endpoint, body) => api.post(`/admin/${endpoint}`, body, opts),
  update: (endpoint, id, body) => api.put(`/admin/${endpoint}/${id}`, body, opts),
  patch: (endpoint, id, body) => api.patch(`/admin/${endpoint}/${id}`, body, opts),
  remove: (endpoint, id) => api.del(`/admin/${endpoint}/${id}`, opts),
  reorder: (endpoint, ids) => api.post(`/admin/${endpoint}/reorder`, { ids }, opts),

  // Site settings singleton
  getSettings: () => api.get('/admin/settings', opts),
  saveSettings: (patch) => api.put('/admin/settings', patch, opts),

  // Users
  listUsers: () => api.get('/admin/users', opts),
  createUser: (body) => api.post('/admin/users', body, opts),
  updateUser: (id, body) => api.put(`/admin/users/${id}`, body, opts),
  removeUser: (id) => api.del(`/admin/users/${id}`, opts),

  // Contact inbox
  listMessages: (status) => api.get(`/contact${status ? `?status=${status}` : ''}`, opts),
  setMessageStatus: (id, status) => api.patch(`/contact/${id}`, { status }, opts),
  removeMessage: (id) => api.del(`/contact/${id}`, opts),

  // Applications (project briefs, collaborator + job applications)
  listApplications: (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
    return api.get(`/applications${q ? `?${q}` : ''}`, opts)
  },
  setApplicationStatus: (id, status) => api.patch(`/applications/${id}`, { status }, opts),
  removeApplication: (id) => api.del(`/applications/${id}`, opts),

  // Community job-board moderation
  listJobPosts: (status) => api.get(`/job-board/admin${status ? `?status=${status}` : ''}`, opts),
  setJobPostStatus: (id, status) => api.patch(`/job-board/admin/${id}`, { status }, opts),
  removeJobPost: (id) => api.del(`/job-board/admin/${id}`, opts),

  // Reviews
  listReviews: (status) => api.get(`/reviews/admin${status ? `?status=${status}` : ''}`, opts),
  createReview: (body) => api.post('/reviews/admin', body, opts),
  updateReview: (id, patch) => api.patch(`/reviews/admin/${id}`, patch, opts),
  removeReview: (id) => api.del(`/reviews/admin/${id}`, opts),

  // Change own password
  changePassword: (currentPassword, newPassword) =>
    api.post('/auth/change-password', { currentPassword, newPassword }, opts),
}
