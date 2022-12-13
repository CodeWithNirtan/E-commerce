  
  function Filtering() {
          let buttons = document.querySelectorAll('.btns button')
          let blocks  = document.querySelectorAll('.bs-card')
          buttons.forEach(button => {
              button.addEventListener('click', (e) => {
                  blocks.forEach(block => {
                      
                  
                      block.style.display = "none"
                    })
                    
                    blocks.forEach(blk => {
                      if (e.target.dataset.menu == blk.dataset.menu) {
               
                        blk.style.display = "block"
                      }
                    })
                    if (e.target.dataset.menu == 'all'){
                  blocks.forEach(block => {
                      
                   
                          block.style.display = 'block'
                  })
              }


              })
          })
      }
      Filtering()
