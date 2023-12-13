import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
          color: 'white',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Please add some notes!</p>
      </div>
    </>
  );
}

export default Home;
