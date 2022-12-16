
  const sendWordHandler = async () => {
    console.log('zaczynam wysyłać')
    const response = await fetch('https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/targets.json', {
      method: 'POST',
      body: JSON.stringify(dictionary),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log('wysłano:', data)

    // console.log('zaczynam wysyłać')
    // for (let i = 0; i < dictionary.length / 10000; i++) {
    //   const response = await fetch(
    //     'https://wordle-dafa9-default-rtdb.europe-west1.firebasedatabase.app/dictionary.json',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify(dictionary.slice(i * 10000, (i + 1) * 10000)),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   )
    //   const data = await response.json()
    // console.log('wysłano:', data)
    // }
  }
