import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'cerebral/react'
import { signal, state } from 'cerebral/tags'
import { Grid, Row, Col } from 'react-material-responsive-grid'

import Form from '../Form'
import Input from '../Input'
import Button from '../Button'

const formPath = 'events.reportEventForm'

const ReportEventSidebar = props => {
  return (
    <Container>
      <Form>
        <Grid marginless>
          <StyledRow>
            <Col sm={6} sm8={4} xs4={4}>
              <Input
                label="title"
                path={`${formPath}.title`}
                width={300}
              />
              <Input
                label="description"
                type="textarea"
                path={`${formPath}.description`}
                width={300}
                height={100}
              />
              <Input
                label="duration"
                path={`${formPath}.duration`}
                width={50}
              />
            </Col>
            <Col sm={6} sm8={4}>
              <br />
              Participants
              <br />
              <br />
              <Button
                onClick={() => props.scanTeamSpeak()}
                icon="refresh"
                label="Scan My TeamSpeak Channel"
              />
              <Participants>
                {props.participants && props.participants.length > 0 && props.participants.map((participant, index) =>
                  <Participant key={index}>
                    <div>{participant.display}</div>
                    <RemoveParticipantButton
                      onClick={e => props.removeParticipantClicked({ path: formPath, participant })}
                      icon="remove"
                      outline={false}
                    />
                  </Participant>
                )}
              </Participants>
            </Col>
          </StyledRow>
        </Grid>
      </Form>
    </Container>
  )
}

ReportEventSidebar.propTypes = {
  participants: PropTypes.array,
  removeParticipantClicked: PropTypes.func,
}

export default connect(
  {
    participants: state`${formPath}.participants`,
    removeParticipantClicked: signal`events.removeParticipantClicked`,
  },
  ReportEventSidebar
)

const Container = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.armyWhite};
`

const StyledRow = styled(Row)`
  overflow: hidden;
`

const Participants = styled.div`
  margin-top: 24px;
  width: 100%;
`

const Participant = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 32px;
  padding: 8px 16px;
  color: ${props => props.theme.colors.tan};
  &:hover {
    background-color: ${props => props.theme.colors.darkGray2};
  }
`

const RemoveParticipantButton = styled(Button)`
  color: ${props => props.theme.colors.darkGray6};
  &:hover {
    color: ${props => props.theme.colors.lightRed};
    background-color: transparent;
  }
`
