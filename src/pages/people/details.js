import React, { Component } from "react";
import { Descriptions, Divider, Skeleton, Empty } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PeopleActions } from "../../ducks/people";

class Details extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.peopleActions.get(this.props.match.params.id);
    }
  }

  render() {
    const { record } = this.props.peopleReducer;
    return (
      <>
        {this.props.peopleReducer.loading ? (
          <Skeleton active />
        ) : (
          <>
            <Divider>Detalhes da Pessoa</Divider>
            {!!this.props.peopleReducer.record ? (
              <>
                <Descriptions>
                  <Descriptions.Item label="Nome">
                    {record.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Altura">
                    {record.height}
                  </Descriptions.Item>
                  <Descriptions.Item label="Massa">
                    {record.mass}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor do Cabelo">
                    {record.hair_color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor do Rosto">
                    {record.skin_color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor dos Olhos">
                    {record.eye_color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ano de Aniversário">
                    {record.birth_year}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sexo">
                    {record.gender}
                  </Descriptions.Item>
                </Descriptions>
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  peopleReducer: state.PeopleReducer
});

const mapDispatchToProps = dispatch => ({
  peopleActions: bindActionCreators(PeopleActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
