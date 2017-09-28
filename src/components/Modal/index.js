import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled, { css } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import DeleteEvent from '../Events/DeleteEventModal'
import Button from '../Button'

const Empty = () => <div></div>

const views = {
  empty: { component: Empty },
  deleteEvent: {
    title: 'Delete Event',
    icon: 'calendar-plus-o',
    component: DeleteEvent,
    confirmSignal: 'events.deleteEventConfirmed',
  },
}

const determineModalComponent = props => {
  if (props.modalActive) return views[props.modalView].component
  return views.empty.component
}

const setModalActions = props => {
  const modalConfirmSignal = views[props.modalView].confirmSignal
  return props.modalActionsUpdated({
    modalConfirmSignal: modalConfirmSignal || 'app.modalConfirm',
  })
}

const Modal = (props) => {
  const ModalComponent = props.modalView ? determineModalComponent(props) : views.empty
  props.modalView && props.modalView !== 'empty' && setModalActions(props)
  return (
    <div>
      <CSSTransitionGroup
        transitionName="modalOverlay"
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        component="div"
      >
        {props.modalActive &&
          <ModalOverlay key="modalOverlay" />
        }
      </CSSTransitionGroup>
      <ModalContainer active={props.modalActive}>
        <CSSTransitionGroup
          transitionName="fadeDown"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          {props.modalActive && props.modalView && props.modalView !== 'empty' &&
            <ModalHeader key="modalHeader">
              <Title>{views[props.modalView].title}</Title>
            </ModalHeader>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="zoomIn"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          {props.modalActive &&
            <ModalComponentContainer key={props.modalView}>
              {props.modalView && <ModalComponent/>}
            </ModalComponentContainer>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="fadeUp"
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          component="span"
        >
          {props.modalActive &&
            <ModalActions key="modalActions">
              <Button
                onClick={() => props.modalActiveToggled({ value: false })}
                icon="close"
                label="Cancel"
                secondary
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                onClick={() => props.modalConfirmClicked()}
                icon={props.modalActionPending ? 'crosshairs' : 'check'}
                iconSpin={props.modalActionPending}
                label={props.modalActionPending ? 'Working...' : props.modalConfirmLabel || 'Confirm'}
                disabled={props.modalActionPending}
                danger
              />
            </ModalActions>
          }
        </CSSTransitionGroup>
      </ModalContainer>
    </div>
  )
}

Modal.propTypes = {
  modalActive: PropTypes.bool,
  modalActionPending: PropTypes.bool,
  modalView: PropTypes.string,
  modalConfirmLabel: PropTypes.string,
  modalActiveToggled: PropTypes.func,
  modalActionsUpdated: PropTypes.func,
  modalConfirmClicked: PropTypes.func,
}

export default connect(
  {
    modalActive: state`app.modalActive`,
    modalView: state`app.modalView`,
    modalConfirmLabel: state`app.modalConfirmLabel`,
    modalActionPending: state`app.modalActionPending`,
    modalActiveToggled: signal`app.modalActiveToggled`,
    modalActionsUpdated: signal`app.modalActionsUpdated`,
    modalConfirmClicked: signal`${state`app.modalConfirmSignal`}`,
  },
  Modal
)

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.95);
  z-index: 9998;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
  transition: all .4s cubic-bezier(.4,0,.2,1);
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all .3s cubic-bezier(.4,0,.2,1);
  z-index: 9999;
  ${props => {
    if (props.active) {
      return css`
        visibility: visible;
        opacity: 1;
      `
    }
    return css`
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    `
  }}
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-width: 300px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.lightTan};
  color: ${props => props.theme.colors.lightTan};
  padding: 0 40px;
  @media (max-width: 720px) {
    padding: 0 24px;
  }
  @media (max-width: 600px) {
    padding: 0 16px;
    height: 48px;
  }
`

const Title = styled.div`
  width: 100%;
  font-size: 2rem;
  text-align: center;
  @media (max-width: 720px) {
    font-size: 1.4rem;

  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`

const ModalComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow: auto;
`

const ModalActions = styled.div`
  margin-top: 56px;
`
