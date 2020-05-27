export default (req, res) => {
  const { fullname, email, department, phone, image } = req.body;
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.send('success');
}