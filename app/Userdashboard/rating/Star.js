'use client'
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function Star({ stars, reviews }) {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span  key={index}>
        {
          stars >= index + 1 ? (
            <FaStar />
          ) : stars >= number ? (
            <FaStarHalfAlt />
          ) : (
            <AiOutlineStar />
          )
        }
      </span>
    );
  });

  return (
    <div>
      {ratingStar}
    </div>
  );
}