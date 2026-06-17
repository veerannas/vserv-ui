import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';

const Terms = () => {
    return (
        <Container className="terms-of-use">
            <Row >
                <Col xs={12} md={12} >
                    <div className="">
                        <h3 className="headingterms">Terms of Use</h3>
                        <p className="text-left">
                            <h5>Mission</h5>
                            Our  mission is to help both customers and service providers to achieve best deals.The path is going forward to tap the unused or efficient utilization of service providers to get the best deal to customers. Both parties will use the platform for nominal cost. ReserveHub provides a marketplace for Businesses to publish their services to a wider customer group and also allows customers to explore all businesses and make reservations with the luxury of staying at home/office.
                            <div className="distance-between"></div>
                            <b>You are exempted to-</b>
                            <ul>
                                <li>User Account </li>
                                <li> Browse Different Services</li>
                                <li>Payment</li>
                                <li>Reschedule/Cancelling</li>
                                <li>Network Access</li>
                            </ul>
                            <div className="distance-between"></div>

                            <b>Under the conditions of-</b>
                            <ul>
                                <li><b className="lightweight">Responsibility – </b>You take responsibility for your edits (since we only host your content).</li>
                                <li><b className="lightweight">Civility –</b> You support a civil environment and do not harass other users. </li>
                                <li><b className="lightweight">Lawful Behavior – </b>You do not violate copyright or other laws.</li>
                                <li><b className="lightweight">No Harm –</b> You do not harm our technology infrastructure.</li>
                                <li><b className="lightweight">Terms of Use and Policies –</b> You adhere to the below Terms of Use and to the applicable community policies when you visit our sites or participate in our communities.</li>
                            </ul>
                            <div className="distance-between"></div>

                            <b>Responsibilities-</b>
                            You oblige to the terms and condition of business, and business has all right to take your service out in case of any violation of the rules.
                            No damage to property, article etc..,and need to pay for the damage if any.
                        </p>
                        <div className="distance-between"></div>
                    </div>
                </Col>

            </Row>
        </Container>
    )
}

export default Terms;







