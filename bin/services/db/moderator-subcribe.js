import models from '../../models/index.js';

//TODO такой механизм доступен только в репликах сете, почему не понятно

(async function (){
  try {
    const changeStream = models.Moderators.watch()

    changeStream.on('change', (change) => {
      if (change.operationType === 'insert') {
        console.log('Появился новый модератор:', change.documentKey)
        // Здесь можно добавить дополнительные действия при появлении нового модератора
      }
    })

  } catch (e) {
    console.error(e)
  }
})()
