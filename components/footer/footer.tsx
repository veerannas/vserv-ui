import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const Footer2 = () => {
	const [onHoverEffectPhone, setonHoverEffectPhone] = useState(false);
	const [onHoverEffectEmail, setonHoverEffectEmail] = useState(false);
	const [onHoverEffectTerms, setonHoverEffectTerms] = useState(false);
	const [onHoverEffectFacebook, setonHoverEffectFacebook] = useState(false);
	const [onHoverEffectInsta, setonHoverEffectInsta] = useState(false);
	const [onHoverEffectTikTok, setonHoverEffectTikTok] = useState(false);
	const [onHoverEffectLinkedIn, setonHoverEffectLinkedIn] = useState(false);

	return (
		<>
			<br></br>

			<footer
				className={`page-footer font-small mdb-color pt-4 bgdark text-white expand-lg  footer-fixed`}>
				<div className=" text-md-left">
					<div>
					<br></br>
						<Row className="footerpadding">
							<Col
								md={6}
								xs={12}
								className="footerpaddingbottom footerfontsize text-center">
								<div className="vertical-text-align">
									© 2021 ReserveHubs Company. All rights reserved.
									<Link href="/terms">
										<a
											target="_blank"
											onMouseEnter={() => {
												setonHoverEffectTerms(true);
											}}
											onMouseLeave={() => {
												setonHoverEffectTerms(false);
											}}
											className={`${onHoverEffectTerms ? "underlinemail-hover" : " "
												} underlinemail term-of-distance`}>
											Terms of Use
										</a>
									</Link>
								</div>
								<br></br>
								<br></br>
							</Col>
							<Col md={3}
								xs={12}>
								<p><span className="text-size">Contact Us</span></p>
								<Row><Col className="icon-margin-top"><span
									className=""
									onMouseEnter={() => {
										setonHoverEffectPhone(true);
									}}
									onMouseLeave={() => {
										setonHoverEffectPhone(false);
									}}>
									<Link href="tel:+1 484 473 6933">
										<a target="_blank" >
											<i
												className={`fas fa-phone-alt mr-1  ${onHoverEffectPhone ? "phonecolor-hover" : " "
													} phonecolor  section-image-center box  footerpaddingbottom footerfontsize`}>

											</i>
										</a>
									</Link>
									<Link href="tel:+1 484 473 6933">
										<a
											target="_blank"
											className={` ${onHoverEffectPhone ? "underlinemail-hover" : " "
												} underlinemail footerfontsize `}>
											&nbsp;+1 484 473 6933
										</a>
									</Link>
								</span></Col></Row>

								<Row><Col className="icon-margin-top foot-icon-phone"><span
									className=""
									onMouseEnter={() => {
										setonHoverEffectEmail(true);
									}}
									onMouseLeave={() => {
										setonHoverEffectEmail(false);
									}}>
									<Link href="tel:+1 484 473 6933">
										<a target="_blank" >
											<i
												className={`fas fa-envelope mr-1  ${onHoverEffectEmail ? "phonecolor-hover" : " "
													} phonecolor  section-image-center box  footerpaddingbottom footerfontsize`}>

											</i>
										</a>
									</Link>
									<Link href="https://www.gmail.com">
										<a
											target="_blank"
											className={` ${onHoverEffectEmail ? "underlinemail-hover" : " "
												} underlinemail footerfontsize`}>
											&nbsp;reserve.hubs.info@gmail.com
										</a>
									</Link>
								</span></Col></Row>

								{/* <p>
								<span
									onMouseEnter={() => {
										setonHoverEffectEmail(true);
									}}
									onMouseLeave={() => {
										setonHoverEffectEmail(false);
									}}>
									<a target="_blank" href="https://www.gmail.com">
										<i
											className={`fas fa-envelope mr-2 ${onHoverEffectEmail ? "envelopecolor-hover" : " "
												} envelopecolor section-image-center box footerpaddingbottom footerfontsize`}></i>
									</a>
									<a
										target="_blank"
										href="https://www.gmail.com"
										className={`${onHoverEffectEmail ? "underlinemail-hover" : " "
											} underlinemail footerfontsize`}>
										reserve.hubs.info@gmail.com
									</a>
								</span>
							</p> */}
							</Col>
							<Col md={2}
								xs={12}>
								<div>
									<span>
										<b>Follow Us</b>
									</span>
								</div>
								{/* <p>
								<span>
									<a
										className="btn-floating btn-sm rgba-white-slight mx-1"
										target="_blank"
										href="https://www.facebook.com/profile.php?id=100069035831990">
										<i className="fab fa-facebook-f section-image-center box iconcolor"></i>
									</a>
								</span>
								<span>Facebook</span>
							</p> */}
								<Row>
									<Col md={12}
										xs={6} className="icon-padding-top cursor-pointer"
										onMouseEnter={() => {
											setonHoverEffectFacebook(true);
										}}
										onMouseLeave={() => {
											setonHoverEffectFacebook(false);
										}}
									>
										<span >
											<Link href="https://www.facebook.com/profile.php?id=100069035831990">
												<a
													className="btn-floating btn-sm rgba-white-slight mx-1"
													target="_blank"
												>
													<i className={`${onHoverEffectFacebook ? "box  facebookcolor-hover box-hover " : " "
														} fab fa-facebook-f section-image-center facebookcolor`} ></i>
												</a>
											</Link>
										</span>
										<span className={`${onHoverEffectFacebook ? " facebooktextcolor" : " "}`} >Facebook</span>
									</Col>
									<Col md={12}
										xs={6} className="icon-padding-top cursor-pointer"
										onMouseEnter={() => {
											setonHoverEffectInsta(true);
										}}
										onMouseLeave={() => {
											setonHoverEffectInsta(false);
										}}
									>
										<span>
											<Link href="https://www.instagram.com/reserve_hubs/">
												<a
													className="btn-floating btn-sm rgba-white-slight mx-1"
													target="_blank"
												>
													<i
														className={`${onHoverEffectInsta ? "box  instagramcolor-hover box-hover " : " "
															} fab fa-instagram section-image-center instagramcolor`}
													></i>
												</a>
											</Link>
										</span>
										<span className={`${onHoverEffectInsta ? " instagramtextcolor" : " "}`}>Instagram</span>
									</Col>
									<Col md={12}
										xs={6} className="icon-padding-top cursor-pointer"
										onMouseEnter={() => {
											setonHoverEffectTikTok(true);
										}}
										onMouseLeave={() => {
											setonHoverEffectTikTok(false);
										}}
									>
										<span>
											<Link href="https://www.tiktok.com/@reserve_hubs">

												<a
													className="btn-floating btn-sm rgba-white-slight mx-1"
													target="_blank"
												>
													<i
														className={`${onHoverEffectTikTok ? "box  tiktokcolor-hover box-hover " : " "
															} fab fa-tiktok section-image-center tiktokcolor`}

													></i>
												</a>
											</Link>
										</span>
										<span className={`${onHoverEffectTikTok ? " tiktoktextcolor" : " "}`}>TikTok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
									</Col>
									<Col md={12}
										xs={6} className="icon-padding-top cursor-pointer"
										onMouseEnter={() => {
											setonHoverEffectLinkedIn(true);
										}}
										onMouseLeave={() => {
											setonHoverEffectLinkedIn(false);
										}}
									>
										<span>
											<Link href="https://www.linkedin.com/in/reserve-hubs/">
												<a
													className="btn-floating btn-sm rgba-white-slight mx-1"
													target="_blank"
												>
													<i
														className={`${onHoverEffectLinkedIn ? "box  linkedincolor-hover box-hover " : " "
															} fab fa-linkedin-in section-image-center linkedincolor`}

													></i>
												</a>
											</Link>
										</span>
										<span className={`${onHoverEffectLinkedIn ? " facebooktextcolor" : " "}`}>Linkedin&nbsp;&nbsp;</span>
									</Col>
								</Row>
							</Col>
							{/* <Col md={7} xs={12}>
							<p>
								<span className="text-size">Contact Us</span>

								<span
									className=""
									onMouseEnter={() => {
										setonHoverEffectPhone(true);
									}}
									onMouseLeave={() => {
										setonHoverEffectPhone(false);
									}}>
									<a target="_blank" href="tel:+1 484 473 6933">
										<i
											className={`fas fa-phone-alt mr-1  ${onHoverEffectPhone ? "phonecolor-hover" : " "
												} phonecolor  section-image-center box  footerpaddingbottom footerfontsize`}>
											{" "}
										</i>
									</a>
									<a
										target="_blank"
										href="tel:+1 484 473 6933"
										className={` ${onHoverEffectPhone ? "underlinemail-hover" : " "
											} underlinemail footerfontsize`}>
										+1 484 473 6933
									</a>
								</span>
								<span
									onMouseEnter={() => {
										setonHoverEffectEmail(true);
									}}
									onMouseLeave={() => {
										setonHoverEffectEmail(false);
									}}>
									<a target="_blank" href="https://www.gmail.com">
										<i
											className={`fas fa-envelope mr-2 ${onHoverEffectEmail ? "envelopecolor-hover" : " "
												} envelopecolor section-image-center box footerpaddingbottom footerfontsize`}></i>
									</a>
									<a
										target="_blank"
										href="https://www.gmail.com"
										className={`${onHoverEffectEmail ? "underlinemail-hover" : " "
											} underlinemail footerfontsize`}>
										reserve.hubs.info@gmail.com
									</a>
								</span>
							</p>
						</Col>
						<Col md={5} xs={12} className="footerpaddingbottom footerfontsize ">
							<div className="socialicon">
								<p>
									<span>
										<b>Follow Us</b>
									</span>
									<span>
										<a
											className="btn-floating btn-sm rgba-white-slight mx-1"
											target="_blank"
											href="https://www.facebook.com/profile.php?id=100069035831990">
											<i className="fab fa-facebook-f section-image-center box iconcolor"></i>
										</a>
										<a
											className="btn-floating btn-sm rgba-white-slight mx-1"
											target="_blank"
											href="https://www.instagram.com/reserve_hubs/">
											<i className="fab fa-instagram section-image-center box instagramcolor"></i>
										</a>
										<a
											className="btn-floating btn-sm rgba-white-slight mx-1"
											target="_blank"
											href="https://www.tiktok.com/@reserve_hubs">
											<i className="fab fa-tiktok section-image-center box tiktokcolor"></i>
										</a>
										<a
											className="btn-floating btn-sm rgba-white-slight mx-1"
											target="_blank"
											href="https://www.linkedin.com/in/reserve-hubs/">
											<i className="fab fa-linkedin-in section-image-center box linkedincolor"></i>
										</a>
									</span>
								</p>
							</div>
						</Col>
					 */}

						</Row>

						{/* <Row>
						<Col
							md={12}
							xs={12}
							className="footerpaddingbottom footerfontsize footerbottom text-center">
							© 2021 ReserveHubs Company. All rights reserved.
							<a
								href="/terms"
								onMouseEnter={() => {
									setonHoverEffectTerms(true);
								}}
								onMouseLeave={() => {
									setonHoverEffectTerms(false);
								}}
								className={`${onHoverEffectTerms ? "underlinemail-hover" : " "
									} underlinemail term-of-distance`}>
								Terms of Use
							</a>
						</Col>
					</Row> */}
						<br></br>
					</div>
				</div>
			</footer>
		</>
	);
};
export default Footer2;