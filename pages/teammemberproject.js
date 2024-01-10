import React from 'react';
import { useRouter } from 'next/router';

const Teammembersproject = ({ projects, username }) => {
  const selectedProject = projects[0]?.projects;
  const router = useRouter();

  const filteredProjects = selectedProject.filter(
    (project) => project.assigned === username || project.assist === username
  );
  console.log("filtered", filteredProjects);

  const handleProjectClick = (project) => {
    console.log("project", project);
    if (project) {
      // Push the project details to the new route
      router.push({
        pathname: '/teammemberprojectdetails',
        query: { projects: JSON.stringify(project) },
      });
    }
  };

  return (
    <div className="mt-8 flex ">
      {filteredProjects.map((project) => (
        <div key={project._id} className="w-fit mb-4 mr-4 bg-white rounded overflow-hidden shadow-lg cursor-pointer">
          <div onClick={() => handleProjectClick(project)} className="p-4">
          <div>
          <img src={project.img} alt={project.name} className="w-full h-48 object-cover" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{project.name}</div>
            {/* <p className="text-gray-700 text-base">{filteredProject.details}</p> */}
          </div>
          <div className="px-6 py-2">
            <p className="text-gray-700 font-bold">Start Date: {project.startDate}</p>
            <p className="text-gray-700 font-bold">End Date: {project.endDate}</p>
            <p className="text-gray-700 font-bold">Status: {project.status}</p>
          </div>
          <div className="px-6 py-4">
            <p className="text-lg font-bold mb-2">Technologies:</p>
            <div className="flex space-x-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teammembersproject;
