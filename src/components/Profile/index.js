import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'cerebral/react'
import { state, signal } from 'cerebral/tags'
import styled from 'styled-components'
// import { rgba } from 'polished'

import ViewContainer from '../ViewContainer'
import Tabs from '../Tabs'

import ProfileInfo from './ProfileInfo'
import Commendations from './Commendations'

const views = {
  info: {
    label: 'Profile Information',
    component: ProfileInfo,
  },
  commendations: {
    label: 'Commendations',
    component: Commendations,
  },
}

const Profile = props => {
  const ContentComponent = props.view ? views[props.view].component : views.info.component
  return (
    <ViewContainer backgroundImage="/images/profile-bg.jpg" centered>
      <ProfileWrapper>
        <Header>
          <UserContainer>
            <User>
              <Callsign>{props.user.callsign}</Callsign>
              <Avatar />
              <Rank>
                <RankImage rank={props.user.rank.id} />
                <RankText>{props.user.rank.name}</RankText>
              </Rank>
            </User>
          </UserContainer>
          <StyledTabs
            tabs={views}
            statePath="profile.view"
            onClick={props.profileViewChanged}
            active
          />
        </Header>
        <Gap />
        <Content>
          <ContentComponent />
        </Content>
      </ProfileWrapper>
    </ViewContainer>
  )
}

Profile.propTypes = {
  view: PropTypes.string,
  user: PropTypes.object,
  profileViewChanged: PropTypes.func,
}

export default connect(
  {
    view: state`profile.view`,
    user: state`user`,
    profileViewChanged: signal`profile.profileViewChanged`,
  },
  Profile
)

const ProfileWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: calc(100% + 48px);
  height: auto;
  flex-direction: column;
  margin: -24px;
  @media (max-width: 600px) {
    width: 100vw;
    margin-top: 24px;
  }
`

const Header = styled.div`
  display: flex;
  flex: 1 0 auto;
  height: 112px;
  max-height: 112px;
  background-color: rgba(0,0,0,0.7);
  padding: 24px 0px 0px 40px;
  @media (max-width: 600px) {
    flex: 0;
    flex-direction: column;
    height: auto;
    max-height: initial;
    background-color: initial;
    padding: 0;
  }
`

const Gap = styled.div`
  flex: 1 0 auto;
  height: 320px;
  max-height: 320px;
  padding: 24px;
  @media (max-width: 600px) {
    flex: 0;
    height: 0;
    padding: 0;
  }
`

const UserContainer = styled.div`
  position: relative;
  display: flex;
  width: 240px;
  @media (max-width: 768px) {
    width: 160px;
  }
  @media (max-width: 600px) {
    width: auto;
  }
`

const User = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conent: center;
  width: 100%;
  @media (max-width: 600px) {
    position: relative;
  }
`

const Callsign = styled.div`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.armyWhite};
`

const Avatar = styled.div`
  width: 160px;
  height: 160px;
  max-height: 160px;
  margin-top: 16px;
  background-color: ${props => props.theme.colors.lightTan};
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    max-height: 120px;
  }
  @media (max-width: 600px) {
    width: 160px;
    height: 160px;
    max-height: 160px;
  }
`

const Rank = styled.div`
  margin-top: 8px;
`

const RankImage = styled.div`

`

const RankText = styled.div`
  font-size: 0.9rem;
`

const StyledTabs = styled(Tabs)`
  align-self: flex-end;
  @media (max-width: 600px) {
    align-self: flex-start;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1 0 auto;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  padding: 24px 40px;
`
