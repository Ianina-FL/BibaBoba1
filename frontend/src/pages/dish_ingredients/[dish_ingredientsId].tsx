import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/dish_ingredients/dish_ingredientsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDish_ingredients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    dish: '',

    ingredient: '',

    quantity: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { dish_ingredients } = useAppSelector(
    (state) => state.dish_ingredients,
  );

  const { dish_ingredientsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: dish_ingredientsId }));
  }, [dish_ingredientsId]);

  useEffect(() => {
    if (typeof dish_ingredients === 'object') {
      setInitialValues(dish_ingredients);
    }
  }, [dish_ingredients]);

  useEffect(() => {
    if (typeof dish_ingredients === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = dish_ingredients[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [dish_ingredients]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: dish_ingredientsId, data }));
    await router.push('/dish_ingredients/dish_ingredients-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit dish_ingredients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit dish_ingredients'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Dish' labelFor='dish'>
                <Field
                  name='dish'
                  id='dish'
                  component={SelectField}
                  options={initialValues.dish}
                  itemRef={'dishes'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Ingredient' labelFor='ingredient'>
                <Field
                  name='ingredient'
                  id='ingredient'
                  component={SelectField}
                  options={initialValues.ingredient}
                  itemRef={'ingredients'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Quantity'>
                <Field type='number' name='quantity' placeholder='Quantity' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/dish_ingredients/dish_ingredients-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDish_ingredients.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DISH_INGREDIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDish_ingredients;
