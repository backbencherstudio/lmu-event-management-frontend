"use client";
import React from 'react';
import Footer from "./_components/footer";
import Header from "./_components/header";
import WhatWeOffer from './_home/what-we-offer';
import OurCoaches from './_home/our-coaches';
import BookSession from './_home/Book-a-session';
import Review from './_home/review';
import Landingpage from './_components/landingpage';

export default function Layout({ children }) {
    return (
      <div className="relative overflow-x-hidden">

        {/* Home Section */}
        <section className="w-full">
          <Landingpage />
        </section>

      </div>
    );
  }