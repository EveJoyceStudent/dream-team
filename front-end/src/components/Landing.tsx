import { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

import "../styling/Landing.css";
import ItemsCollection from "./ItemsCollection";

function Landing() {
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(collection(db, "Organisations"));
    onSnapshot(q, (querySnapshot) => {
      // setOrgList dumps all the orgs in orgList
      setOrgList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    //   these lines set up the format of the page
    <>
      <div id="header">
        <div id="headingText">
          <h1>EdAble</h1>

          <h3>
            <i>Supporting the growth of social-enterprises</i>
          </h3>
          <br />
          <h4>
            By making a tax deductable doantion to EdAble, you will contribute
            to...
          </h4>

          <div id="carousel">
            <Carousel
              touch={true}
              interval={null}
              indicators={true}
              variant="dark"
              style={{ margin: "0px" }}
            >
              {orgList.map((org: any) => (
                <Carousel.Item
                  key={org.id.toString()}
                  style={{ textAlign: "center", padding: "0px 10vw 50px" }}
                >
                  <h2 style={{ textAlign: "center" }}>{org.data.name}</h2>
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      paddingBottom: "20px",
                    }}
                    src={org.data.img}
                    alt="Org logo"
                  />

                  <p style={{ textAlign: "center", fontSize: "20px" }}>
                    {org.data.description}
                  </p>
                  <Button variant="warning">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "30px",
                      }}
                      to={`organisation/${org.id}`}
                    >
                      <i>I WANT TO MAKE A CONTRIBUTION</i>
                    </Link>
                  </Button>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {/* items */}
      <ItemsCollection />
    </>
  );
}

export default Landing;
