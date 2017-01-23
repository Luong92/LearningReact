
const styles = {

  base:{
    background: "blue",
    ':hover':{
      background: "green"
    }
   },

   square:{
     background: '#fff',
     border: '1px solid #999',
     float: 'left',
     fontSize: "24px",
     fontWeight: 'bold',
     lineHeight: '34px',
     height: '34px',
     marginRight: '-1px',
     marginTop: '-1px',
     padding: 0,
     textAlign: 'center',
     width: '34px',
     ':focus':{
       outline: 'none',
     },
   },

   header:{
     margin: '60px auto',
     width: '80%',
     '@media screen and (min-width: 500px)':{
       width: '45%',
     }
   },
 }



export default styles
