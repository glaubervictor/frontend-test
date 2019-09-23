import React, { Component } from "react";
import { Table, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as StarshipsActions } from "../../ducks/starships";
import Media from "react-media";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Nome",
        dataIndex: "name",
        render: text => <strong>{text}</strong>
      },
      {
        title: "Modelo",
        dataIndex: "model"
      },
      {
        title: "Fabricante",
        dataIndex: "manufacturer"
      },
      {
        title: "Passageiros",
        dataIndex: "passengers"
      },
      {
        title: "Capacidade Carga",
        dataIndex: "cargo_capacity"
      },
      {
        title: "Classe",
        dataIndex: "starship_class"
      }
    ];
  }

  componentDidMount() {
    this.props.starshipsActions.getByIds();
  }

  render() {
    return (
      <>
        <Divider>Naves Estelares</Divider>
        <Media
          queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
          }}
        >
          {matches => (
          <Table
            pagination={false}
            loading={this.props.starshipsReducer.loading}
            rowKey="name"
            dataSource={this.props.starshipsReducer.records}
            columns={
              matches.small
                ? this.columns.slice(0, 2)
                : matches.medium
                ? this.columns.slice(0, 4)
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
  starshipsReducer: state.StarshipsReducer
});

const mapDispatchToProps = dispatch => ({
  starshipsActions: bindActionCreators(StarshipsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
