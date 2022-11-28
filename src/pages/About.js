import React from "react";
import cc from "../assets/chiefCampaigner.jpg";
import developer from "../assets/developer.jpg";
import Feature from "../components/Feature";
import { TeamMember } from "../components/TeamMember";
const About = () => {
  const team_members = [
    {
      image: developer,
      name: "Odeyemi Increase",
      description: "I love designing.",
      job: "Chief Archtert",
    },
    {
      image: cc,
      name: "Odeyemi Ayobami",
      description: "I love coding, less word show me the code",
      job: "fullstack developer",
    },
  ];
  const features = [
    {
      title: "Finance",
      description: "We make it easier to save and also access funds from anyone in a trustless way. Taking the opportunities provided by Polygon we made sure gas fee will not  hinder the process and reduce the HIGH gas fees of layer 1 chains",
      svg: <svg
      className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
        clipRule="evenodd"
      ></path>
    </svg>
      
    },
    {
      title: "Security",
      description: "It was delibarately build using the blockchain to enjoy the security with is a characteristic of the blockchain",
      svg:  <svg
      className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      ></path>
    </svg>
      
    },
    {
      title: "Trust",
      description: "When dealing with money it is very important that trust is not compromised on. We have engrained portocols to make sure that your funds are given and easily accessible in the event of a project not reaching it potential",
      svg:  <svg
      className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
    </svg>
      
    }
  ];
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              It all began in late 2022 as a idea to learn, build decentralised app, it has grown to be much more. We want funding and accessing 
              financial aid to be more accessable than ever. We want you to test your new ideas and be an inspiration to us all (builders/creator).
              We can't wait to hear about great campaigns/ideas/projects funded with the help of this project that will be our joy. With Love from the Team.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          
            {features.map(feature =>(
                <Feature title={feature.title} description={feature.description} svg={feature.svg}
                />
            ))}
            
                  
            
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Meet The Team(s)
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            To a prospect seeking out a new service provider, the process can be a little overwhelming.
             It's easy to wonder: Who are the real people behind all the smoke and mirrors?
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {team_members.map((team_member) => (
              <TeamMember
                image={team_member.image}
                name={team_member.name}
                description={team_member.description}
                job={team_member.job}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
