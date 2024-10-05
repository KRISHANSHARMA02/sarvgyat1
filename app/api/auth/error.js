export default function Error({ error }) {
    return (
      <div>
        <h1>An error occurred</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  
  // You might need to handle the error message passed via query parameters
  export async function getServerSideProps(context) {
    const error = context.query.error || 'Unknown error';
    return {
      props: { error },
    };
  }
  