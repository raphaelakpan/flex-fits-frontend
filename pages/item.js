import SingleItem from '../components/item';

const Item = props => {
  return (
    <div>
      <SingleItem id={props.query.id} />
    </div>
  )
}

export default Item;
