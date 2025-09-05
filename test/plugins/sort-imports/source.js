// Test file for import sorting plugin

// Third-party modules
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import express from 'express';
import mongoose from 'mongoose';

// Built-in modules
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { createServer } from 'http';

// Local modules - alias patterns
import api from '@/api';
import components from '@/components';
import hooks from '@/hooks';
import types from '@/types';

// Local modules - single word
import config from 'config';
import utils from 'utils';

// Local modules - with path
import helpers from 'src/helpers';
import services from 'src/services';
import constants from 'src/constants';

// Relative imports - deep paths
import deeplyNestedModule from '../../../../../../../../deeply/nested/module';
import anotherDeepModule from '../../../../../../another/deep/module';

// Relative imports - medium paths
import mediumNestedModule from '../../../../../medium/nested/module';
import anotherMediumModule from '../../../../another/medium/module';

// Relative imports - shallow paths
import shallowModule from '../../../shallow/module';
import anotherShallowModule from '../../another/shallow/module';

// Relative imports - very shallow paths
import veryShallowModule from '../very/shallow/module';
import anotherVeryShallowModule from '../another/very/shallow/module';

// Relative imports - same directory
import sameDirModule from './same-dir-module';
import anotherSameDirModule from './another-same-dir-module';

// Relative imports - current directory
import currentDirModule from './current-dir-module';
import anotherCurrentDirModule from './another-current-dir-module';

// Type imports
import { User } from '@/types/user';
import { Post } from '@/types/post';
import { Config } from '@/types/config';

// Side effect imports
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import '@styles/global.css';

// Dynamic imports
const dynamicModule = import('./dynamic-module');
const anotherDynamicModule = import('@/another-dynamic-module');

// Named imports with various patterns
import { formatDate, parseDate, validateDate } from '@/utils/date';
import { createUser, updateUser, deleteUser } from '@/services/user';
import { fetchPosts, createPost, updatePost } from '@/services/post';

// Mixed default and named imports
import defaultExport, { named1, named2, named3 } from '@/mixed-module';
import anotherDefault, { namedA, namedB, namedC } from '@/another-mixed-module';

// Namespace imports
import * as dateUtils from '@/utils/date';
import * as userUtils from '@/utils/user';
import * as postUtils from '@/utils/post';

// React component imports
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Hook imports
import useAuth from '@/hooks/useAuth';
import useApi from '@/hooks/useApi';
import useForm from '@/hooks/useForm';
import useTheme from '@/hooks/useTheme';

// Store imports
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, decrement } from '@/store/slices/counter';
import { setUser, clearUser } from '@/store/slices/user';

// Utility function imports
import { debounce, throttle, memoize } from '@/utils/performance';
import { validateEmail, validatePhone, validatePassword } from '@/utils/validation';
import { formatDate, formatTime, formatCurrency } from '@/utils/format';

// Service imports
import { authService } from '@/services/auth';
import { userService } from '@/services/user';
import { postService } from '@/services/post';
import { commentService } from '@/services/comment';

// API imports
import { userApi } from '@/api/user';
import { postApi } from '@/api/post';
import { commentApi } from '@/api/comment';

// Component exports
export default function TestComponent() {
    return <div>Test Component</div>;
}

export { TestComponent };
