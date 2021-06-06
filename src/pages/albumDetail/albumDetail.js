import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { fetchAlbumsDetail } from "../../store/actions/albumDetail";
import ModalPhoto from "../../components/albumDetail/modalPhoto";

const AlbumDetail = () => {
  const { albumsId } = useParams();
  const [albumData, setAlbumData] = useState({});
  const [photosData, setPhotosData] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const toggle = (title, url) => {
    setModalData({ title, url });
    setModal(true);
  }

  const {
    data: albumDetail,
    photos: albumPhotos
  } = useSelector((state) => state.albumDetail);
  useEffect(() => {
    if (albumDetail) setAlbumData(albumDetail);
    if (albumPhotos) setPhotosData(albumPhotos);
  }, [albumPhotos, albumDetail]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumsDetail(albumsId));
  }, [dispatch, albumsId]);

  const { title } = albumData;
  return (
    <Fragment>
      <Card className="my-2">
        <CardBody>
          <CardTitle tag="h2">{title} Photos</CardTitle>
          <Row className="no-gutters">
            {
              photosData.map((photo) => {
                const { id, title, thumbnailUrl, url } = photo
                return (
                  <Col xs={6} md={3} key={id} className="text-truncate text-center mb-2">
                    <img src={thumbnailUrl} alt={title} onClick={() => toggle(title, url)} />
                  </Col>
                )
              })
            }
          </Row>
        </CardBody>
      </Card>
      {modal && <ModalPhoto modal={modal} setModal={setModal} modalData={modalData} />}
    </Fragment>
  );
}

export default AlbumDetail;