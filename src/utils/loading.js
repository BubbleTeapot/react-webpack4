function loading() {
  const loading = document.getElementById('loading');
  return function(payload) {
    payload ? loading.style.display = 'flex' : loading.style.display = 'none';
  }
}
export const isShowLoading = loading();