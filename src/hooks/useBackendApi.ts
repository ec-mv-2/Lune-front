import axios from "axios";

const URL = 'http://localhost:3333'
const storageData = localStorage.getItem("authToken");
export const useBackendApi = () =>({
  
  login: async (email: string, password: string) => {
    const response = await axios.post(`${URL}/login`, {
      email,
      password,
    });
    return {
      user: response.data.userExists,
      token: response.data.token,
    };
  },

  persistenceLogin: async (token: string) => {
    const response = await axios.get(`${URL}/persistenceLogin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      user: response.data,
    };
  },

  logout: async () => {
    return {
      status: true,
    };
  },

  createUser: async(name: string,
    email: string,
    password: string,
    cpf: string,
    cep: string,
    birthDate: string,
    state: string,
    isContractor:boolean) =>{
    const response = await axios.post(`${URL}/createUser`, {name, email, password, cpf, cep, birthDate, state, isContractor})

    return{
      user: response.data
    }
  },

  addSkill: async(nameSkill: string)=>{
    const response = await axios.put(`${URL}/AddSkill`, {nameSkill},{
      headers: {
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      nameSkill: response.data
    }
  },

  getUser: async (userId: string) => {
    const response = await axios.get(`${URL}/GetUser/${userId}`);
    return {
      user: response.data
    };
  },

  
  addExperience: async(nameExperience: string, start: string, termination: string, company: string, activities: string)=>{
    const response = await axios.put(`${URL}/AddExperience`, {nameExperience, start, termination, company, activities},{
      headers: { 
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      experience: response.data
    }
  },

  addAcademic: async(course: string, start: string, termination: string, college: string, education: string)=>{
    const response = await axios.put(`${URL}/AddAcademic`, {course, start, termination, college, education},{
      headers: {
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      academic: response.data
    }
  },

  updateUser: async(name: string, bio: string)=>{
    const response = await axios.put(`${URL}/UpdateUser`, {name, bio},{
      headers: {
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      user: response.data
    }
  },


  createPosition: async (
    title: String,
    enterprise: String,
    summary: String,
    salary: Number,
    skill: String,
    jobModel: String,
    location: String,
    startDate: String,
    endDate: String,
    degree: String,
    experience: Number,
    isPrivate: Boolean
  ) => {
    const response = await axios.post(
      `${URL}/AddPosition`, 
      {
        title,
        enterprise,
        summary,
        salary,
        skill,
        jobModel,
        location,
        startDate,
        endDate,
        degree,
        experience,
        isPrivate
      }, 
      {
        headers: {
          Authorization: `Bearer ${storageData}`,
        },
      }
    );

    return {
      position: response.data,
    };
  },


  editPosition: async (
    id: String,
    title: String,
    enterprise: String,
    summary: String,
    salary: Number,
    skill: String,
    jobModel: String,
    location: String,
    startDate: String,
    endDate: String,
    degree: String,
    experience: Number,
    isPrivate: Boolean
  ) => {
    const response = await axios.put(
      `${URL}/UpdatePosition`, 
      {
        id,
        title,
        enterprise,
        summary,
        salary,
        skill,
        jobModel,
        location,
        startDate,
        endDate,
        degree,
        experience,
        isPrivate
      }, 
      {
        headers: {
          Authorization: `Bearer ${storageData}`,
        },
      }
    );

    return {
      position: response.data,
    };
  },
  deletePosition: async (

    title: String,
   
  ) => {
    await axios.delete(
      `${URL}/DeletePosition/${title}`, 
      {
        headers: {
          Authorization: `Bearer ${storageData}`,
        },
      }
    );

   
  },

  listPosition: async()=>{
    const response = await axios.get(`${URL}/listPosition`, {
      headers: {
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      position: response.data
    }
  },

  getPosition: async (jobId: string) => {
    const response = await axios.get(`${URL}/ListJob/${jobId}`);
    return {
      job: response.data.job,
      contractor: response.data.contractor
    };
  },

  addCandidate: async(jobId: string)=>{
    const response = await axios.put(`${URL}/AddCandidate`, {jobId},{
      headers: {
        Authorization: `Bearer ${storageData}`,
      },
    })
    return {
      job: response.data
    }
  },

})