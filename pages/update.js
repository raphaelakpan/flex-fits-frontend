import UpdateItem from '../components/items/UpdateItem';

const Update = ({ query }) => {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  )
}

export default Update;
