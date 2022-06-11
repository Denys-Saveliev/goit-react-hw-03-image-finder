import { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImage, PER_PAGE } from '../../Service/PixabayApi';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
import LoadMore from 'components/LoadMore';
import Modal from '../Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageInfo extends Component {
  state = {
    galleryItems: [],
    page: 1,
    status: Status.IDLE,
    loadMore: false,
    showModal: false,
    modalImageId: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    const nextPage = prevState.page !== this.state.page;
    const newRequest = nextName !== prevName;

    if (newRequest || nextPage) {
      this.setState({ status: Status.PENDING });

      fetchImage(nextName, this.state.page)
        .then(data => {
          const requestedImageAmount = data.totalHits;
          if (requestedImageAmount === 0) {
            this.setState({
              status: Status.REJECTED,
            });
            toast.error('Please insert valid request!', {
              position: 'top-left',
              autoClose: 3000,
              theme: 'colored',
            });
          }

          const loadMore = this.state.page * PER_PAGE < requestedImageAmount;

          if (newRequest) {
            this.setState({
              galleryItems: data.hits,
              status: Status.RESOLVED,
              loadMore,
            });
            return;
          }

          this.setState(prevState => ({
            galleryItems: [...prevState.galleryItems, ...data.hits],
            status: Status.RESOLVED,
            loadMore,
          }));
        })
        .catch(error => {
          this.setState({
            status: Status.REJECTED,
          });
          toast.error('Code error: ' + error, {
            position: 'top-left',
            autoClose: 3000,
            theme: 'colored',
          });
        });
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleGalleryItemClick = id => {
    this.setState({ modalImageId: id });
    this.toggleModal();
  };

  setModalImageURL = id => {
    return this.state.galleryItems.find(galleryItem => galleryItem.id === id);
  };

  render() {
    const { status, galleryItems, loadMore, showModal, modalImageId } =
      this.state;
    const modalImageItem = this.setModalImageURL(modalImageId);

    return (
      <>
        {status === Status.IDLE && (
          <h2 style={{ textAlign: 'center' }}>
            Please enter your query in the search query
          </h2>
        )}

        {galleryItems && (
          <>
            <ImageGallery
              imageGalleryItems={galleryItems}
              onGalleryItemClick={this.handleGalleryItemClick}
            />
          </>
        )}

        {showModal && (
          <Modal
            imageURL={modalImageItem.largeImageURL}
            imageAlt={modalImageItem.tags}
            onClose={this.toggleModal}
          />
        )}

        {loadMore && status !== Status.PENDING && (
          <LoadMore onClick={this.incrementPage} />
        )}

        {status === Status.PENDING && <Loader />}
      </>
    );
  }
}

export default ImageInfo;
