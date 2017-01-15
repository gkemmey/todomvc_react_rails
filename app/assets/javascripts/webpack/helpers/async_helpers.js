export const csrfToken = () => (
  document.head.querySelector("meta[name=csrf-token]").content
)

export const csrfHeader = () => (
  { "X-CSRF-Token": csrfToken() }
)
