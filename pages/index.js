import Items from '../components/items/Items';

const Home = props => {
  return (
    <div>
      <Items page={parseInt(props.query.page) || 1} />
    </div>
  )
}

export default Home;
