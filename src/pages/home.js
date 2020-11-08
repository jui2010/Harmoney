import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    section : {
        padding : '20px'
    },
    mainDiv : {
        display: 'flex', 
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center'
      }
})

class home extends Component {

    render() {
        // const { classes } = this.props
      let resp = {}
        var headers = {
          'QB-Realm-Hostname': 'hackathon20-jthombre.quickbase.com',
        'Authorization': 'QB-TEMP-TOKEN 9_bqyt6qak8_b5qp8k_pb9b_a_-b_ddmebxgdgpapvkbtmk8isdrgcji5yzprwhb6t3tefd89xnggc4ky9f4_eat54kk',
        // 'Authorization': 'QB-USER-TOKEN b5qp8k_pb9b_di2f8a6dyunitkdtsreiecx7fijq',
          'Content-Type': 'application/json'
      }
      var body = {"from":"bqxxssmjp","select":[19,20,21],"options":{"skip":0,"top":0,"compareWithAppLocalTime":false}}
      
      fetch('https://api.quickbase.com/v1/records/query',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        })
      .then(res => {
        if (res.ok) {
          return res.json().then(res => {
            resp = res
            console.log(resp.data[0]["19"].value)
          });
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}));
      })
      .catch(err => console.log(err))

     
      return (
          
          <Grid container style={{border: '1px solid black'}}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>


                  dcdhbchdbchbchbch
                  {/* {console.log(resp.data)} */}
              </Grid>
              <Grid item xs={4}></Grid>
              
          </Grid>
      )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default  connect(mapStateToProps)(withStyles(styles)(home))
