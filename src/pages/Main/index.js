import React, { Component } from 'react';

import { Keyboard } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Form,
  Input,
  Button,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users != users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { newUser, users } = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  };

  render() {
    const { newUser, users, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            onChangeText={text => this.setState({ newUser: text })}
            value={newUser}
            onEndEditing={this.handleAddUser}
            returnKeyType="send"
          />
          <Button loading={loading} onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#ffffff" />
          </Button>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
