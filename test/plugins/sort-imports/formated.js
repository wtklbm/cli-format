// Test file for import sorting plugin

// Third-party modules

// Built-in modules

import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
import { promisify } from 'util';

import axios from 'axios';
// Local modules - single word
import config from 'config';
import express from 'express';
import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';
import React, { useCallback, useEffect, useState } from 'react';
import utils from 'utils';

import constants from 'src/constants';
// Local modules - with path
import helpers from 'src/helpers';
import services from 'src/services';

// Local modules - alias patterns
import api from '@/api';
import components from '@/components';
import hooks from '@/hooks';
import types from '@/types';
import { Config } from '@/types/config';
import { Post } from '@/types/post';
// Type imports
import { User } from '@/types/user';
import { useDispatch, useSelector } from 'react-redux';

// Relative imports - deep paths
import deeplyNestedModule from '../../../../../../../../deeply/nested/module';

import anotherDeepModule from '../../../../../../another/deep/module';

// Relative imports - medium paths
import mediumNestedModule from '../../../../../medium/nested/module';

import anotherMediumModule from '../../../../another/medium/module';

// Relative imports - shallow paths
import shallowModule from '../../../shallow/module';

import anotherShallowModule from '../../another/shallow/module';

import anotherVeryShallowModule from '../another/very/shallow/module';
// Relative imports - very shallow paths
import veryShallowModule from '../very/shallow/module';

import anotherCurrentDirModule from './another-current-dir-module';
import anotherSameDirModule from './another-same-dir-module';
// Relative imports - current directory
import currentDirModule from './current-dir-module';
// Relative imports - same directory
import sameDirModule from './same-dir-module';
// Side effect imports
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import '@styles/global.css';

import anotherDefault, { namedA, namedB, namedC } from '@/another-mixed-module';
import { commentApi } from '@/api/comment';
import { postApi } from '@/api/post';
// API imports
import { userApi } from '@/api/user';
// React component imports
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useApi from '@/hooks/useApi';
// Hook imports
import useAuth from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';
import useTheme from '@/hooks/useTheme';
// Mixed default and named imports
import defaultExport, { named1, named2, named3 } from '@/mixed-module';
// Service imports
import { authService } from '@/services/auth';
import { commentService } from '@/services/comment';
import {
    createPost,
    fetchPosts,
    postService,
    updatePost
} from '@/services/post';
import {
    createUser,
    deleteUser,
    updateUser,
    userService
} from '@/services/user';
// Store imports
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment } from '@/store/slices/counter';
import { clearUser, setUser } from '@/store/slices/user';
// Named imports with various patterns
import { formatDate, parseDate, validateDate } from '@/utils/date';
// Namespace imports
import * as dateUtils from '@/utils/date';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';
// Utility function imports
import { debounce, memoize, throttle } from '@/utils/performance';
import * as postUtils from '@/utils/post';
import * as userUtils from '@/utils/user';
import {
    validateEmail,
    validatePassword,
    validatePhone
} from '@/utils/validation';

// Dynamic imports
const dynamicModule = import('./dynamic-module');
const anotherDynamicModule = import('@/another-dynamic-module');

// Component exports
export default function TestComponent() {
    return <div>Test Component</div>;
}

export { TestComponent };
