// 這也是個miidleware function，這邊沒有next參數的原因是因為，最後是使用res.send()結束了這次req, res，沒有要再傳給下一個middleware了

const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound