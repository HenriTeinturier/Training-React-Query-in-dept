import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = async (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
}

const fetchCoursesByChannelId = async (channelId: string) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
}

type DependentQueriesProps = {
  email: string
}

export const DependentQueriesPage = ({email}: DependentQueriesProps) => {

  const {data: user, isLoading: userLoading} = useQuery(
    ['user', email],
    () => fetchUserByEmail(email),
  );
  const channelId = user?.data.channelId;
  const {data: courses, isLoading: coursesLoading} = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  )

  return (
  <>
    <h3>DependentQueriesPage</h3>
    <h4>{`your email is: ${email}`}</h4>
    {
      userLoading && <h4>loading...</h4>
    }
    {
      user && <div style={{marginBottom: '10px', color: '#646cff'}}>{`votre chaîne youtube est: ${user?.data.channelId}`}</div>
    }
    <h4>{`Les cours de votre chaîne sont:`}</h4>
    {
      (coursesLoading && user) && <h4>loading...</h4>
    }
    {
      user &&  courses?.data.courses.map((course: any, index: number) => 
        
          <div key={index} style={{marginBottom: '10px', color: '#646cff'}}>{course}</div>
        
      )
    }
    
  </>
  )
}