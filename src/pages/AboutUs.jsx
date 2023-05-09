import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Abt1 from "../assets/images/AboutUs/Abt1.png";
import Abt2 from "../assets/images/AboutUs/Abt2.png";

const AboutUs = () => {
  return (
    <>
      <MainLayout>
        <div className=" mb-20">
          <div className="">
            <p className="bg-black-background w-full text-white text-center py-[22px] font-Ballo text-[1rem] font-semibold tracking-wide">
              FREE TRANSIT SERVICE FOR EVERY DESTINATION
            </p>
            <div className="bg-banner-about-us bg-no-repeat bg-cover h-[414px] flex justify-center items-center">
              <p className=" font-Almarai font-bold text-7xl text-white">
                WHO WE ARE
              </p>
            </div>

            <div className="max-w-screen-xl mx-auto">
              <div className="">
                {/* Path */}
                <p className="mt-8 mb-10 text-[0.75rem] text-my-text-gray-third tracking-wide font-Amata">
                  <Link to="/"> Homepage</Link> / About us
                </p>
                {/* Main content */}
                <div className="px-10">
                  <h1 className=" font-Ballo text-4xl font-semibold mt-20 mb-12">
                    About VietnamRoadtrip
                  </h1>
                  <div className="grid grid-cols-5 gap-16">
                    {/* Text Content */}
                    <div className="mb-7 col-span-3 leading-7 font-Ballo text-[14px] text-justify">
                      <p className="mb-5">
                        VietnamRoadtrip’s iconic brand is synonymous with
                        affordable long-distance travel in Southern Vietnam and
                        a unique national network. Founded in 2015,
                        VietnamRoadtrip LLC is the largest provider of intercity
                        bus transportation, serving 14 destinations across
                        Southern Vietnam with a modern, environmentally friendly
                        fleet. It has become an Vietnamese icon, providing safe,
                        enjoyable, and affordable travel to nearly 16 million
                        passengers each year in Vietnam. The VietnamRoadtrip
                        running dog is one of the most recognized brands in the
                        world.
                      </p>

                      <p className="mb-5">
                        While VietnamRoadtrip is well known for its regularly
                        scheduled passenger service, the company also provides a
                        number of other services for its customers.
                        VietnamRoadtrip also offers charter packages for
                        businesses, conventions, schools, and other groups at
                        competitive rates.
                      </p>

                      <p className="mb-5">
                        In 2019, the company launched its premium city-to-city
                        service, VNTrip Express, and has since quickly expanded
                        the popular service to more than 14 markets across
                        Southern Vietnam. It also operates VNRoadtrip Connect, a
                        service that connects rural communities to larger
                        VNRoadtrip markets in Vietnam.
                      </p>

                      <p className="mb-5">
                        In addition, VietnamRoadtrip has interline partnerships
                        with a number of independent bus lines across Vietnam
                        Nation. These bus companies provide complementary
                        services to VNTrip Lines' existing schedules and link to
                        many of the smaller towns in VNRoadtrip Lines' national
                        route system.
                      </p>
                      <p className="mb-5">
                        Passengers use VNRoadtrip to make connections to cities
                        not served by rail on National Railway service by
                        purchasing a ticket for the bus connection from National
                        Railway in conjunction with the purchase of their rail
                        ticket. Passengers may also buy a bus ticket directly
                        from VNRoadtrip. VietnamRoadtrip acquired VNRoadtrip
                        Lines Inc. on October 21, 2021. Having already been
                        present on the Southern Vietnam market with its services
                        since 2018, the purchase of VNRoadtrip brought together
                        two leaders in the intercity bus industry, combining
                        VietnamRoadtrip innovative global technology and shared
                        mobility expertise with VNRoadtrip’s iconic nationwide
                        presence and experience.
                      </p>

                      <p className="mb-5">
                        {" "}
                        Together, VietnamRoadtrip, VNRoadtrip, and their
                        partners continue to offer a smart, green, and connected
                        World Class intercity bus experience, providing the best
                        affordable option for even more people traveling
                        throughout Vietnam.
                      </p>
                    </div>

                    {/* Images */}
                    <div className="mt-3 col-span-2">
                      <div className="">
                        <img src={Abt1} className="h-[260px] mb-24"></img>
                        <img src={Abt2} className="h-[400px]"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default AboutUs;
