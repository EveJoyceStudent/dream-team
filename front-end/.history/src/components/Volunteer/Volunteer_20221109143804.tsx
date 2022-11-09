import { useEffect, useState } from "react";
import "../Landing/Landing.css";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Button, Container, Carousel, Row, Col } from "react-bootstrap";
import { ReactComponent as InclusionHero } from "../Landing/InclusionHero.svg";

function Volunteer() {
  const [orgList, setOrgList] = useState<any>([]);

  // gets all the orgs from dbs
  useEffect(() => {
    const q = query(
      collection(db, "Organisations"),
      where("activeStatus", "==", true)
    );
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    //   these lines set up the format of the page
    <>
      <div className="landing">
        {/* Burger menu */}
        {/* <div className="navBarContainer">
          <Sidebar />
        </div> */}

        <div className="App" id="outer-container">
          {/* Carousel */}
          <div className="slideshowCon">
            <Row>
              <Col>
                <div className="carouselContainer">
                  <Carousel
                    touch={true}
                    interval={4000}
                    indicators={true}
                    variant="light"
                  >
                    {orgList.map((org: any) => (
                      <Carousel.Item
                        key={org.id.toString()}
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Link
                          to={`/volunteer/organisation/${org.id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {/* this div contains the carousel item's contents and makes the whole carousel item a link (based on link tag above) */}
                          <div className="carousel-contents">
                            <img
                              className="carouselImage"
                              src={`${org.data.img}`}
                            />
                            <div className="caroursel-text">
                              <div className="carousel-contents-bottom"></div>
                            </div>
                            <h2 className="title">{org.data.name}</h2>
                            <div className="carousel-contents-bottom">
                              <p className="orgSummary">{org.data.summary}</p>{" "}
                              <Button
                                className="btnContribute"
                                variant="warning"
                              >
                                <div className="btnText">
                                  I WANT TO SUPPORT
                                  <span>{org.data.name.toUpperCase()}</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Link>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Volunteer;
