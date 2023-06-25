import { Paper } from "@mui/material";
import { Navbar } from './Navbar';
import { API } from "../global";
import { useEffect, useState } from "react";
import { Margin } from "@mui/icons-material";

export function ShowTable() {
    const [url, setUrl] = useState([]);
  
    useEffect(() => getdata(), []);
    const getdata = () => {
      fetch(`${API}/geturl`, { method: "GET" })
        .then((data) => data.json())
        .then((mvs) => { 
          setUrl(mvs);
        })
        .catch((e) => console.log(e));
    };
  
    return (
      <div>
        <Paper elevation={4} style={{ minHeight: "100vh", borderRadius: "0px" }}>
          <div>
            <Navbar/>
          </div>
  
          <div className="table-content" >
            <h3>URL TABLE</h3>
            <table className="table1 " style={{margin:"50px auto", border:"1px solid black",width:"50%"}}>
              <thead >
                <tr  style={{borderBottom:"1px solid black"}}>
                  <th style={{borderBottom:"1px solid black"}}  scope="col">s.no</th>
                  <th style={{borderBottom:"1px solid black"}}  scope="col">URL</th>
                  <th style={{borderBottom:"1px solid black"}}  scope="col">Shorten</th>
                  <th style={{borderBottom:"1px solid black"}}  scope="col">Visit</th>
                </tr>
              </thead>
              <tbody style={{margin:"50px auto", border:"1px solid black"}}>
                {url.map((u, index) => (
                  <Table
                    key={index}
                    long={u.long}
                    short={u.short}
                    visit={u.visit}
                    index={index}
                    style={{margin:"50px auto", border:"1px solid black"}}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div></div>
        </Paper>
      </div>
    );
  }
  
  export function Table({ index, long, short, visit }) {
    return (
      <>
        <tr>
          <td> {index + 1} </td>
          <td> {long} </td>
          <td>
            {" "}
            <a href={`${API}/geturl/${short}`} target="_blank" rel="noreferrer">
              {short}
            </a>{" "}
          </td>
          <td> {visit} </td>
        </tr>
      </>
    );
  }
  