import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Tooltip, Button, Badge, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PeopleActions } from "../../ducks/people";
import { Creators as StarshipsActions } from "../../ducks/starships";
import Media from "react-media";

const ButtonGroup = Button.Group;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);

    this.columnsXS = [
      {
        title: "Nome",
        dataIndex: "name",
        render: text => <strong>{text}</strong>
      },
      {
        title: "Ações",
        dataIndex: "acao",
        render: (text, record) => {
          const peopleId = record.url
            .replace("https://swapi.co/api/people/", "")
            .replace("/", "");

          const starshipsIds = [];

          record.starships.map((id, index) => {
            id = id
              .replace("https://swapi.co/api/starships/", "")
              .replace("/", "");
            starshipsIds.push(id);
          });

          return (
            <ButtonGroup>
              <Tooltip title="Mais Detalhes">
                <Button
                  onClick={() =>
                    this.props.history.push(`/people/details/${peopleId}`)
                  }
                  type="primary"
                  icon="user"
                />
              </Tooltip>
              <Tooltip title="Naves Estelares">
                <Badge count={starshipsIds.length}>
                  <Button
                    onClick={() =>
                      this.props.starshipsActions.setIds(starshipsIds)
                    }
                    type="primary"
                    icon="rocket"
                  />
                </Badge>
              </Tooltip>
            </ButtonGroup>
          );
        }
      }
    ];

    this.columnsMD = [
      {
        title: "Nome",
        dataIndex: "name",
        render: text => <strong>{text}</strong>
      },
      {
        title: "Altura",
        dataIndex: "height"
      },
      {
        title: "Massa",
        dataIndex: "mass"
      },
      {
        title: "Ações",
        dataIndex: "acao",
        render: (text, record) => {
          const peopleId = record.url
            .replace("https://swapi.co/api/people/", "")
            .replace("/", "");

          const starshipsIds = [];

          record.starships.map((id, index) => {
            id = id
              .replace("https://swapi.co/api/starships/", "")
              .replace("/", "");
            starshipsIds.push(id);
          });

          return (
            <ButtonGroup>
              <Tooltip title="Mais Detalhes">
                <Button
                  onClick={() =>
                    this.props.history.push(`/people/details/${peopleId}`)
                  }
                  type="primary"
                  icon="user"
                />
              </Tooltip>
              <Tooltip title="Naves Estelares">
                <Badge count={starshipsIds.length}>
                  <Button
                    onClick={() =>
                      this.props.starshipsActions.setIds(starshipsIds)
                    }
                    type="primary"
                    icon="rocket"
                  />
                </Badge>
              </Tooltip>
            </ButtonGroup>
          );
        }
      }
    ];

    this.columns = [
      {
        title: "Nome",
        dataIndex: "name",
        render: text => <strong>{text}</strong>
      },
      {
        title: "Altura",
        dataIndex: "height"
      },
      {
        title: "Massa",
        dataIndex: "mass"
      },
      {
        title: "Cor do Cabelo",
        dataIndex: "hair_color"
      },
      {
        title: "Cor do Rosto",
        dataIndex: "skin_color"
      },
      {
        title: "Cor do Olhos",
        dataIndex: "eye_color"
      },
      {
        title: "Ações",
        dataIndex: "acao",
        render: (text, record) => {
          const peopleId = record.url
            .replace("https://swapi.co/api/people/", "")
            .replace("/", "");

          const starshipsIds = [];

          record.starships.map((id, index) => {
            id = id
              .replace("https://swapi.co/api/starships/", "")
              .replace("/", "");
            starshipsIds.push(id);
          });

          return (
            <ButtonGroup>
              <Tooltip title="Mais Detalhes">
                <Button
                  onClick={() =>
                    this.props.history.push(`/people/details/${peopleId}`)
                  }
                  type="primary"
                  icon="user"
                />
              </Tooltip>
              <Tooltip title="Naves Estelares">
                <Badge count={starshipsIds.length}>
                  <Button
                    onClick={() =>
                      this.props.starshipsActions.setIds(starshipsIds)
                    }
                    type="primary"
                    icon="rocket"
                  />
                </Badge>
              </Tooltip>
            </ButtonGroup>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.props.peopleActions.getAll(1);
  }

  onChangePage(page, size) {
    this.props.peopleActions.getAll(page);
  }

  render() {
    return (
      <>
        <Divider>Pessoas</Divider>
        <Media
          queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
          }}
        >
          {matches => (
            <Table
              bordered
              pagination={{
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.onChangePage,
                defaultCurrent: this.props.peopleReducer.currentPage,
                total: this.props.peopleReducer.totalRecords
              }}
              loading={this.props.peopleReducer.loading}
              rowKey="name"
              dataSource={this.props.peopleReducer.records}
              columns={
                matches.small
                  ? this.columnsXS
                  : matches.medium
                  ? this.columnsMD
                  : this.columns
              }
            />
          )}
        </Media>
      </>
    );
  }
}

const mapStateToProps = state => ({
  peopleReducer: state.PeopleReducer
});

const mapDispatchToProps = dispatch => ({
  peopleActions: bindActionCreators(PeopleActions, dispatch),
  starshipsActions: bindActionCreators(StarshipsActions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Grid)
);
