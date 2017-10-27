export const fetchBenches = () => {
  return $.ajax({
    url: 'api/benches',
    error: (err) => console.log(err)
  })
}
